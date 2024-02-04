import bcrypt from 'bcrypt'
import { type UserCreated, type CreateUser } from '@my-types/'
import { prisma } from '@utils/prismaClient'

const saltRounds = 10

const exclude = async <User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Promise<Omit<User, Key>> =>
  Object.fromEntries(
    Object.entries(Boolean(user) || {}).filter(
      ([key]) => !keys.includes(key as Key)
    )
  ) as Omit<User, Key>

export const userModel = {
  create: async ({ input }: { input: CreateUser }): Promise<UserCreated> => {
    const passwordHash = await bcrypt.hash(input.password, saltRounds)
    const userForDB = await exclude(input, ['password'])
    const newUser = await prisma.users.create({
      data: {
        ...userForDB,
        passwordHash
      }
    })
    return await exclude(newUser, ['passwordHash'])
  },

  getAll: async (): Promise<UserCreated[]> => {
    const users = await prisma.users.findMany()
    return users
  }
}
