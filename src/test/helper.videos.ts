import type { Video } from '@my-types/*'

export const getPublicVideos = (videos: Video[]): Video[] => {
  return videos.filter((video) => video.isPublic)
}

export const user = {
  email: 'luchooo@gmail.com',
  password: 'luchooo123'
}

export const newVideo = {
  title: 'HTTP cat 🍰',
  description: '🎢 video from http extension',
  url: 'https://www.youtube.com/shorts/lrajbjOPWjo',
  isPublic: true
}

export const getVideoByUserId = (userId: string, videos: Video[]): Video => {
  const video = videos.find((video) => video.usersId === userId)
  if (video === undefined) throw new Error('Video not found')
  return video
}
