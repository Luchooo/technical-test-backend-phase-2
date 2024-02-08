/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { type UserModel } from '@my-types/*'
import { userController } from '@controllers/users.ctrl'

export const usersRouter = (usersModel: UserModel): Router => {
  const usersRouter = Router()
  const userCtrl = userController(usersModel)

  usersRouter.post('/sign-in', userCtrl.signIn)
  usersRouter.post('/sign-up', userCtrl.create)
  return usersRouter
}
