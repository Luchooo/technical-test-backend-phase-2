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
  getById: RequestHandler
  create: RequestHandler
  delete: RequestHandler
  update: RequestHandler
}

export interface VideoModel {
  getAllPublic: () => Promise<Video[]>
  getAll: () => Promise<Video[]>
  getById: ({ id }: { id: string }) => Promise<Video>
  create: ({
    payload,
    userId
  }: {
    payload: VideoCreatePayload
    userId: string
  }) => Promise<Video>
  delete: ({ id }: { id: string }) => Promise<void>
  update: ({
    id,
    userId,
    payload
  }: {
    id: string
    userId: string
    payload: VideoUpdatePayload
  }) => Promise<Video>
}
