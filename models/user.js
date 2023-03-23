const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.valid('starter', 'pro', 'business'),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required('missing required field email'),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.valid('starter', 'pro', 'business').required(),
});

const User = model('user', userSchema);

module.exports = {
  joiSchema,
  joiLoginSchema,
  emailSchema,
  User,
  joiSubscriptionSchema,
};
