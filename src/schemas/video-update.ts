import Joi from 'joi'

export const schemaUpdateVideo = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  url: Joi.string().trim().uri().optional(),
  isPublic: Joi.boolean().optional()
})
