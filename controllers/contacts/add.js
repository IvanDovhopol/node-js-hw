const { Contact } = require('../../models');

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    code: 201,
    data: {
      result: contact,
    },
  });
};

module.exports = add;
