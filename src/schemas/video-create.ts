import Joi from 'joi'

export const schemaCreateVideo = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  url: Joi.string().trim().uri().required(),
  isPublic: Joi.boolean().required()
})
