const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) throw new NotFound('Contact not found');

  res.json({
    success: true,
    code: 200,
    message: 'contact deleted',
    data: {
      result: contact,
    },
  });
};

module.exports = remove;
