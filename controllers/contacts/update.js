const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const update = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!contact) throw new NotFound('Contact not found');

  res.json({
    success: true,
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = update;
