import z from 'zod'

const videoSchema = z.object({
  title: z.string({
    invalid_type_error: 'Video title must be a string',
    required_error: 'Video title is required.'
  }),
  description: z.string({
    invalid_type_error: 'Video description must be a string',
    required_error: 'Video description is required.'
  }),
  url: z
    .string({ required_error: 'Video url is required.' })
    .url({ message: 'Video must be a valid URL' }),
  isPublic: z.boolean({
    required_error: 'isPublic is required',
    invalid_type_error: 'isPublic must be a boolean'
  })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validateVideo = async (input: unknown) => {
  return await videoSchema.safeParseAsync(input)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validatePartialVideo = async (input: unknown) => {
  return await videoSchema.partial().safeParseAsync(input)
}
