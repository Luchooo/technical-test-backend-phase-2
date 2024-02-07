import type { VideoModel } from '@my-types/'
import { usePrisma } from '@utils/prismaClient'

export const videoModel: VideoModel = {
  getAllPublic: async () => {
    const videos = await usePrisma.videos.findMany({
      where: {
        isPublic: true
      }
    })
    return videos
  },

  getAll: async () => {
    const videos = await usePrisma.videos.findMany()
    return videos
  },

  getById: async ({ id }) => {
    const video = await usePrisma.videos.findUnique({
      where: {
        id
      }
    })

    if (video === null) throw new Error('Video not found')
    return video
  },

  create: async ({ payload, userId }) => {
    const newVideo = await usePrisma.videos.create({
      data: { ...payload, usersId: userId }
    })
    return newVideo
  },

  delete: async ({ id }) => {
    await usePrisma.videos.delete({
      where: {
        id
      }
    })
  },

  update: async ({ id, userId, payload }) => {
    const updatedVideo = await usePrisma.videos.update({
      where: {
        id,
        usersId: userId
      },
      data: payload
    })
    return updatedVideo
  }
}
