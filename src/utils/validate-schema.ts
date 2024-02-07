import type joi from 'joi'

export const validatePayload = async <T = unknown>(
  schema: joi.Schema,
  payload: unknown
): Promise<T> => {
  return await schema.validateAsync(payload)
}
