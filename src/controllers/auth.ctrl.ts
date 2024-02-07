import jwt from 'jsonwebtoken'
import { validatePayload } from '@utils/validate-schema'
import { schemaSignIn } from '@schemas/sign-in'
import ErrorKnow from '@utils/errorKnow'
import type {
  LoggedIn,
  AuthController,
  AuthModel,
  SignInPayload
} from '@my-types/*'

import constants from '@App/constants/index'

const getToken = async (loggedIn: LoggedIn): Promise<string> => {
  const userForToken = {
    id: loggedIn.id,
    username: loggedIn.username
  }
  const jwtSecret = constants.TOKEN_SETTING.SECRET
  if (jwtSecret === undefined)
    throw new ErrorKnow(constants.ERROR_MESSAGE.JWT_SECRET_MISSING)
  return jwt.sign(userForToken, jwtSecret)
}

export const authController = (authModel: AuthModel): AuthController => {
  return {
    signIn: async (req, res, next) => {
      try {
        const schema = schemaSignIn
        const payload = await validatePayload<SignInPayload>(schema, req.body)
        const loggedUser = await authModel.signIn({ payload })
        const token = await getToken(loggedUser)
        res.status(200).json({ ...loggedUser, token })
      } catch (e) {
        next(e)
      }
    }
  }
}
