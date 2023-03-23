const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { email, avatarURL } = req.user;
  const user = await User.findOne({ email });

  if (!user) throw new Unauthorized('Not authorized');

  res.json({
    success: true,
    code: 200,
    data: {
      user: {
        email,
        subscription: user.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = getCurrent;
