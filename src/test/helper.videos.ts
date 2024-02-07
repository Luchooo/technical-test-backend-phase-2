import type { Video } from '@my-types/*'

export const getPublicVideos = (videos: Video[]): Video[] => {
  return videos.filter((video) => video.isPublic)
}
