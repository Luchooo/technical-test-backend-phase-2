import type { NextFunction, Request, Response } from 'express'

export interface User {
  id: string
  username: string
  email: string
  password: string
  avatarUrl: string
}

export type UserPayload = Omit<User, 'id'>

export type UserCreated = Omit<User, 'password'>
export interface UserDB extends UserCreated {
  passwordHash: string
}

export interface UserModel {
  create: ({ payload }: { payload: UserPayload }) => Promise<UserCreated>
}

export interface UserController {
  create: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
