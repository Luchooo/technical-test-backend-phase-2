import { usePrisma } from '@utils/prismaClient'
import type { UserCreated, UserPayload } from '@my-types/'
import { hashPassword } from '@utils/hashPassword'
import ErrorKnow from '@utils/errorKnow'

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

  if (userCreated === null) throw new ErrorKnow('Error getting user created')
  return userCreated
}

export const userModel = {
  create: async ({
    payload
  }: {
    payload: UserPayload
  }): Promise<UserCreated> => {
    const { avatarUrl, email, password, username } = payload
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
