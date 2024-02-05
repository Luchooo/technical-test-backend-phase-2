import { type UserModel, type UserController } from '@my-types/*'
import { validateUser } from '@schemas/users'
import { handleError } from '@utils/errorHandler'
import { Prisma } from '@utils/prismaClient'

export const userController = (userModel: UserModel): UserController => {
  return {
    create: async (req, res) => {
      try {
        const result = await validateUser(req.body)
        if (!result.success) throw new Error(result.error.message)
        const newUser = await userModel.create({ input: result.data })
        res.status(201).json(newUser)
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            res.status(400).json({ error: 'email or username already taken' })
          }
        } else {
          await handleError(res, e)
        }
      }
    }
  }
}
