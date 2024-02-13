import constants from '@App/constants'
import type { VideoModel } from '@my-types/'
import ErrorKnow from '@utils/errorKnow'
import { usePrisma } from '@utils/prismaClient'

export const videoModel: VideoModel = {
  getAllPublic: async () => {
    const videos = await usePrisma.videos.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        isPublic: true
      },
      include: {
        Users: {
          select: {
            username: true,
            avatarUrl: true
          }
        }
      }
    })
    return videos
  },

  getAll: async () => {
    const videos = await usePrisma.videos.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        Users: {
          select: {
            username: true,
            avatarUrl: true
          }
        }
      }
    })
    return videos
  },

  getAllByUserId: async ({ userId }) => {
    const videos = await usePrisma.videos.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        usersId: userId
      }
    })
    return videos
  },

  getById: async ({ id }) => {
    const video = await usePrisma.videos.findUnique({
      where: {
        id
      }
    })

    if (video === null)
      throw new ErrorKnow(constants.ERROR_MESSAGE.VIDEO_NOT_FOUND)
    return video
  },

  create: async ({ payload, userId }) => {
    const newVideo = await usePrisma.videos.create({
      data: { ...payload, usersId: userId }
    })
    return newVideo
  },

  delete: async ({ id, userId }) => {
    await usePrisma.videos.delete({
      where: {
        id,
        usersId: userId
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
