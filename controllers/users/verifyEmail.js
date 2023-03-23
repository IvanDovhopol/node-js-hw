const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) throw Unauthorized();
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.json({
    success: true,
    code: 200,
    message: 'Verify success',
  });
};

module.exports = verifyEmail;
