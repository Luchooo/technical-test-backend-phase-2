import Joi from 'joi'

export const schemaSignIn = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().min(7).required()
})
