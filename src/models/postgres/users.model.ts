import { usePrisma } from '@utils/prismaClient'
import { type UserCreated, type CreateUser } from '@my-types/'
import { hashPassword } from '@utils/hashPassword'

const selectdFields = {
  avatarUrl: true,
  email: true,
  id: true,
  username: true
}

const getUserById = async (id: string): Promise<UserCreated> => {
  const userCreated = await usePrisma.users.findUnique({
    where: { id },
    select: selectdFields
  })

  if (userCreated === null) throw new Error('Error getting user created')
  return userCreated
}

export const userModel = {
  create: async ({ input }: { input: CreateUser }): Promise<UserCreated> => {
    const { avatarUrl, email, password, username } = input
    const passwordHash = await hashPassword(password)

    const newUser = await usePrisma.users.create({
      data: {
        username,
        passwordHash,
        email,
        avatarUrl
      }
    })

    return await getUserById(newUser.id)
  }
}
