import { type UpdateVideo, type CreateVideo, type Video } from '@my-types/'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const videoModel = {
  getAllPublic: async (): Promise<Video[]> => {
    const videos = await prisma.videos.findMany({
      where: {
        isPublic: true
      }
    })
    return videos
  },

  getAll: async (): Promise<Video[]> => {
    const videos = await prisma.videos.findMany()
    return videos
  },

  getById: async ({ id }: { id: string }): Promise<Video> => {
    const video = await prisma.videos.findUnique({
      where: {
        id
      }
    })

    if (video === null) throw new Error('Video not found')
    return video
  },

  create: async ({ input }: { input: CreateVideo }): Promise<Video> => {
    const newVideo = await prisma.videos.create({
      data: input
    })
    return newVideo
  },

  delete: async ({ id }: { id: string }): Promise<void> => {
    await prisma.videos.delete({
      where: {
        id
      }
    })
  },

  update: async ({ id, input }: UpdateVideo): Promise<Video> => {
    const updatedVideo = await prisma.videos.update({
      where: {
        id
      },
      data: input
    })
    return updatedVideo
  }
}
