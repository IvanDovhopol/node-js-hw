const { Conflict } = require('http-errors');
const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password, subscription = 'starter' } = req.body;

  const user = await User.findOne({ email });
  if (user) throw new Conflict('Email in use');

  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    success: true,
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;