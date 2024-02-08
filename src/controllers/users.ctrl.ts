import type {
  UserModel,
  UserController,
  UserPayload,
  LoggedIn,
  SignInPayload
} from '@my-types/*'
import { schemaUser } from '@schemas/user'
import { validatePayload } from '@utils/validate-schema'
import jwt from 'jsonwebtoken'
import { schemaSignIn } from '@schemas/sign-in'
import ErrorKnow from '@utils/errorKnow'
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

export const userController = (userModel: UserModel): UserController => {
  return {
    create: async (req, res, next) => {
      try {
        const schema = schemaUser
        const payload = await validatePayload<UserPayload>(schema, req.body)
        const newUser = await userModel.create({ payload })
        res.status(201).json(newUser)
      } catch (e) {
        next(e)
      }
    },

    signIn: async (req, res, next) => {
      try {
        const schema = schemaSignIn
        const payload = await validatePayload<SignInPayload>(schema, req.body)
        const loggedUser = await userModel.signIn({ payload })
        const token = await getToken(loggedUser)
        res.status(200).json({ ...loggedUser, token })
      } catch (e) {
        next(e)
      }
    }
  }
}
