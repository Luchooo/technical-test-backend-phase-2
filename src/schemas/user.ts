import Joi from 'joi'

export const schemaUser = Joi.object({
  username: Joi.string().trim().lowercase().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().min(7).required(),
  avatarUrl: Joi.string().trim().required()
})
