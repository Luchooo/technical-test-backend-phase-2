import { type Video } from '@my-types/*'

export const getPublicVideos = (videos: Video[]): Video[] => {
  return videos.filter((video) => video.isPublic)
}

export const initialVideos = [
  {
    title: 'Test cat Video',
    description: '🎢Cat Video Private',
    url: 'https://www.youtube.com/shorts/Po098TRdOn4',
    createdAt: new Date(),
    isPublic: false
  },
  {
    title: 'Test dog Video',
    description: '🎢 Dog Video Public',
    url: 'https://www.youtube.com/shorts/IN0T1kyvGi4',
    createdAt: new Date(),
    isPublic: true
  },
  {
    title: 'Test cat video Maria',
    description: '🎢 Cat Video Private Maria',
    url: 'https://www.youtube.com/shorts/TAo_CHchVnM',
    createdAt: new Date(),
    isPublic: false
  },
  {
    title: 'Test dog video maria public',
    description: '🎢 Dog video public owner maria',
    url: 'https://www.youtube.com/shorts/BYESIhhrWSY',
    createdAt: new Date(),
    isPublic: true
  }
]
