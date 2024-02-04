import { type Request, type Response } from 'express'

export interface Video {
  id: string
  title: string
  description: string
  url: string
  createdAt: Date
  isPublic: boolean
}

export type CreateVideo = Omit<Video, 'id' | 'createdAt'>

export interface UpdateVideo {
  id: string
  input: Partial<CreateVideo>
}

export interface VideoController {
  getAllPublic: (req: Request, res: Response) => Promise<void>
  getAll: (req: Request, res: Response) => Promise<void>
  getById: (req: Request, res: Response) => Promise<void>
  create: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<void>
  update: (req: Request, res: Response) => Promise<void>
}

interface VideoModel {
  getAllPublic: () => Promise<Video[]>
  getAll: () => Promise<Video[]>
  getById: ({ id }: { id: string }) => Promise<Video>
  create: ({ input }: { input: CreateVideo }) => Promise<Video>
  delete: ({ id }: { id: string }) => Promise<void>
  update: ({ id, input }: UpdateVideo) => Promise<Video>
}

export interface User {
  id: string
  username: string
  email: string
  password: string
  avatarUrl: string
}

export type CreateUser = Omit<User, 'id'>
export type UserCreated = Omit<User, 'password'>

interface UserModel {
  create: ({ input }: { input: CreateUser }) => Promise<UserCreated>
  getAll: () => Promise<UserCreated[]>
}

export interface UserController {
  create: (req: Request, res: Response) => Promise<void>
  getAll: (req: Request, res: Response) => Promise<void>
}

export interface Models {
  videoModel: VideoModel
  userModel: UserModel
}
