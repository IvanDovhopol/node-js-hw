const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Incorrect data or verification filed.');
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const { name, avatarURL } = await User.findByIdAndUpdate(user._id, { token });

  res.json({
    success: true,
    code: 200,
    data: {
      token,
      user: {
        email,
        name,
        avatarURL,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
