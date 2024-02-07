import { usePrisma } from '@utils/prismaClient'
import type { SignInPayload, LoggedIn } from '@my-types/'
import bcrypt from 'bcrypt'
import ErrorKnow from '@utils/errorKnow'
import constants from '@App/constants'

export const authModel = {
  signIn: async ({
    payload
  }: {
    payload: SignInPayload
  }): Promise<LoggedIn> => {
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
