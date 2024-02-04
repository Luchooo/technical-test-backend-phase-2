import { type Request, type Response } from 'express'

export interface Video {
  id: string
  title: string
  description: string
  url: string
  createdAt: number
  isPublic: boolean
}

export type CreateVideo = Omit<Video, 'id' | 'createdAt'>

export interface UpdateVideo {
  id: string
  input: Partial<CreateVideo>
}

export interface User {
  id: string
  username: string
  email: string
  password: string
  avatarUrl: string
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
