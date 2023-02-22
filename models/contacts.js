const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().required().min(7),
  phone: Joi.string().required(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required('missing field favorite'),
});

const Contact = model('contact', contactsSchema);

module.exports = {
  Contact,
  joiSchema,
  joiFavoriteSchema,
};
