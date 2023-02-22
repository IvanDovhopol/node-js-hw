const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!contact) throw new NotFound('Contact not found');

  res.json({
    success: true,
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = updateFavorite;
