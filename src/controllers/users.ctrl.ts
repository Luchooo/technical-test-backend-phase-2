import type { UserModel, UserController, UserPayload } from '@my-types/*'
import { schemaUser } from '@schemas/user'
import { validatePayload } from '@utils/validate-schema'

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
    }
  }
}
