import { type UpdateVideo, type CreateVideo, type Video } from '@my-types/'
import { usePrisma } from '@utils/prismaClient'

export const videoModel = {
  getAllPublic: async (): Promise<Video[]> => {
    const videos = await usePrisma.videos.findMany({
      where: {
        isPublic: true
      }
    })
    return videos
  },

  getAll: async (): Promise<Video[]> => {
    const videos = await usePrisma.videos.findMany()
    return videos
  },

  getById: async ({ id }: { id: string }): Promise<Video> => {
    const video = await usePrisma.videos.findUnique({
      where: {
        id
      }
    })

    if (video === null) throw new Error('Video not found')
    return video
  },

  create: async ({ input }: { input: CreateVideo }): Promise<Video> => {
    const newVideo = await usePrisma.videos.create({
      data: input
    })
    return newVideo
  },

  delete: async ({ id }: { id: string }): Promise<void> => {
    await usePrisma.videos.delete({
      where: {
        id
      }
    })
  },

  update: async ({ id, input }: UpdateVideo): Promise<Video> => {
    const updatedVideo = await usePrisma.videos.update({
      where: {
        id
      },
      data: input
    })
    return updatedVideo
  }
}
