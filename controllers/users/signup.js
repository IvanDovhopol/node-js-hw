const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../models');
const { sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { name, email, password, subscription = 'starter' } = req.body;

  const user = await User.findOne({ email });
  if (user) throw new Conflict('Email in use');

  const avatarURL = gravatar.url(email);

  const verificationToken = v4();
  const newUser = new User({ email, subscription, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  console.log('verificationToken: ', verificationToken);

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
      user: {
        name,
        email,
        subscription,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
