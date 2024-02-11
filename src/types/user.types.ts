import type { NextFunction, Request, Response } from 'express'

export interface User {
  id: string
  username: string
  email: string
  password: string
  avatarUrl: string
}

export type UserPayload = Omit<User, 'id'>

export type ResponseUser = Omit<User, 'password'>

export interface ResponseUserTkn extends ResponseUser {
  token: string
}

export interface UserDB extends ResponseUser {
  passwordHash: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface UserModel {
  create: (args: { payload: UserPayload }) => Promise<ResponseUser>
  signIn: (args: { payload: SignInPayload }) => Promise<ResponseUser>
}

export interface UserController {
  create: (req: Request, res: Response, next: NextFunction) => Promise<void>
  signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
