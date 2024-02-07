/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { type UserModel } from '@my-types/*'
import { userController } from '@controllers/users.ctrl'

export const usersRouter = (usersModel: UserModel): Router => {
  const usersRouter = Router()
  const userCtrl = userController(usersModel)

  usersRouter.post('/', userCtrl.create)
  return usersRouter
}
