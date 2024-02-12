import type { NextFunction, Request, Response } from 'express'

export interface Video {
  id: string
  title: string
  description: string
  url: string
  createdAt: Date
  isPublic: boolean
  usersId: string
}

export interface VideoPrisma extends Video {
  Users: {
    username: string
    avatarUrl: string
  }
}

export interface VideoCreatePayload
  extends Omit<Video, 'id' | 'createdAt' | 'usersId'> {}

export interface VideoUpdatePayload
  extends Partial<Omit<Video, 'id' | 'createdAt' | 'usersId'>> {}

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

export interface VideoController {
  getAllPublic: RequestHandler
  getAll: RequestHandler
  getAllByUserId: RequestHandler
  getById: RequestHandler
  create: RequestHandler
  delete: RequestHandler
  update: RequestHandler
}

export interface VideoModel {
  getAllPublic: () => Promise<VideoPrisma[]>
  getAll: () => Promise<VideoPrisma[]>
  getAllByUserId: (args: { userId: string }) => Promise<Video[]>
  getById: (args: { id: string }) => Promise<Video>
  create: (args: {
    payload: VideoCreatePayload
    userId: string
  }) => Promise<Video>
  delete: (args: { id: string; userId: string }) => Promise<void>
  update: (args: {
    id: string
    userId: string
    payload: VideoUpdatePayload
  }) => Promise<Video>
}
