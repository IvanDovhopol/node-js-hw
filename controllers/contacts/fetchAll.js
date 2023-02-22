const { Contact } = require('../../models');

const fetchAll = async (_, res, next) => {
  const contacts = await Contact.find({});

  res.json({
    success: true,
    code: 200,
    data: {
      results: contacts,
    },
  });
};

module.exports = fetchAll;
