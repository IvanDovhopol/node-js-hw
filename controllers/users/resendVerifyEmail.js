const { Unauthorized, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw Unauthorized('Email Not Found');
  if (user.verify) throw BadRequest('Verification has already been passed');

  const mail = {
    to: email,
    subject: 'Confirm Email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm Email</a>`,
  };

  await sendEmail(mail);

  res.json({
    success: true,
    cose: 200,
    message: 'Verify email send success',
  });
};

module.exports = resendVerifyEmail;
