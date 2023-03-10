import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(16).required()
});

export const siginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(16).required()
});

export const postSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  body: Joi.string().required(),
  author: Joi.string()
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});


