import { randomUUID } from 'node:crypto'
import { type UpdateVideo, type CreateVideo, type Video } from '@my-types/'
import videosData from './videos.json'
const videos = videosData as Video[]

const getPublicVideos = (videos: Video[]): Video[] => {
  return videos.filter((video) => video.isPublic)
}

export const videoModel = {
  getAllPublic: async (): Promise<Video[]> => {
    return getPublicVideos(videos)
  },

  getAll: async (): Promise<Video[]> => {
    return videos
  },

  getById: async ({ id }: { id: string }): Promise<Video> => {
    const video = videos.find((video) => video.id === id)
    if (typeof video === 'undefined') throw new Error('Video not found')
    return video
  },

  create: async ({ input }: { input: CreateVideo }): Promise<Video> => {
    const newVideo: Video = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().getTime()
    }

    videos.push(newVideo)
    return newVideo
  },

  delete: async ({ id }: { id: string }): Promise<void> => {
    const videoIndex = videos.findIndex((video) => video.id === id)
    if (videoIndex === -1) throw new Error('Video not found')
    videos.splice(videoIndex, 1)
  },

  update: async ({ id, input }: UpdateVideo): Promise<Video> => {
    const videoIndex = videos.findIndex((video) => video.id === id)
    if (videoIndex === -1) throw new Error('Video not found')
    videos[videoIndex] = {
      ...videos[videoIndex],
      ...input
    }
    return videos[videoIndex]
  }
}
