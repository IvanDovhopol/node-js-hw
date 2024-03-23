const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const getCurrent = async (req, res) => {
  const { email, avatarURL } = req.user;
  console.log('req.user', req.user);
  const user = await User.findOne({ email });
  console.log('user', user);

  if (!user) throw new Unauthorized('Not authorized in refresh');

  // for clear collection users
  // const { collection } = await User;
  // collection.deleteMany({});

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
