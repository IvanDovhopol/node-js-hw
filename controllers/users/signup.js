const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { sendEmail } = require('../../utils');

const { BASE_URL, SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password, subscription = 'starter' } = req.body;

  const user = await User.findOne({ email });
  if (user) throw new Conflict('Email in use');

  function generateToken(user) {
    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = v4();
  const newUser = new User({ name, email, subscription, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const token = generateToken(newUser);

  await User.findOneAndUpdate({ email }, { $set: { token } });

  const mail = {
    to: email,
    subject: 'Confirm Email',
    html: `Click this link to confirm your email: <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm Your Email</a>. If you didn't create an account, please ignore this message.`,
  };
  await sendEmail(mail);

  res.status(201).json({
    success: true,
    code: 201,
    data: {
      token,
      user: {
        name,
        email,
        subscription,
        avatarURL: newUser.avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
