const { Contact } = require('../../models');

const fetchAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, '', { skip, limit: Number(limit) }).populate(
    'owner',
    '_id name email'
  );

  res.json({
    success: true,
    code: 200,
    data: {
      results: contacts,
    },
  });
};

module.exports = fetchAll;
