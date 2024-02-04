import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required.'
  }),
  email: z.string({
    invalid_type_error: 'User email must be a string',
    required_error: 'User email is required.'
  }),
  password: z.string({
    invalid_type_error: 'User password must be a string',
    required_error: 'User password is required.'
  }),
  avatarUrl: z
    .string({ required_error: 'User avatar url is required.' })
    .url({ message: 'User avatar url must be a valid URL' })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validateUser = async (input: unknown) => {
  return await userSchema.safeParseAsync(input)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validatePartialUser = async (input: unknown) => {
  return await userSchema.partial().safeParseAsync(input)
}
