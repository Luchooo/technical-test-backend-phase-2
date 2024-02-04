import { type Request, type Response } from 'express'
import { type UserModel, type UserController } from '@my-types/*'
import { handleError } from '@utils/errorHandler'
import { validateUser } from '@schemas/users'

export const userController = (userModel: UserModel): UserController => {
  return {
    create: async (req: Request, res: Response) => {
      try {
        const result = await validateUser(req.body)
        if (!result.success) throw new Error(result.error.message)
        const newUser = await userModel.create({ input: result.data })
        res.json(newUser)
      } catch (e) {
        await handleError(res, e)
      }
    },

    getAll: async (_req: Request, res: Response) => {
      try {
        const users = await userModel.getAll()
        res.json(users)
      } catch (e) {
        await handleError(res, e)
      }
    }
  }
}
