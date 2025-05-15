import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(100).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(100).required(),
});