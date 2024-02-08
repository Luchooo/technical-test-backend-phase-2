import { usePrisma } from '@utils/prismaClient'
import type { UserCreated, UserModel } from '@my-types/'
import { hashPassword } from '@utils/hashPassword'
import ErrorKnow from '@utils/errorKnow'
import bcrypt from 'bcrypt'
import constants from '@App/constants'

const getUserById = async (id: string): Promise<UserCreated> => {
  const userCreated = await usePrisma.users.findUnique({
    where: { id },
    select: {
      avatarUrl: true,
      email: true,
      id: true,
      username: true
    }
  })

  if (userCreated === null) throw new ErrorKnow('Error getting user created')
  return userCreated
}

export const userModel: UserModel = {
  create: async ({ payload }) => {
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
  },

  signIn: async ({ payload }) => {
    const { password, email: emailInput } = payload

    const user = await usePrisma.users.findUnique({
      where: { email: emailInput },
      select: { id: true, username: true, passwordHash: true }
    })

    if (user === null) {
      throw new ErrorKnow(constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD)
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorrect) {
      throw new ErrorKnow(constants.ERROR_MESSAGE.INVALID_EMAIL_PASSWORD)
    }

    const { id, username } = user
    return { id, username }
  }
}
