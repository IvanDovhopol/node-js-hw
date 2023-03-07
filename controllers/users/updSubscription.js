const { NotFound } = require('http-errors');
const { User } = require('../../models');

const updSubscription = async (req, res) => {
  const { id } = req.params;

  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(id, { subscription }, { new: true });
  if (!user) throw new NotFound('Subscription not found');

  res.json({
    success: true,
    code: 200,
    data: {
      id,
      user,
    },
  });
};

module.exports = updSubscription;
