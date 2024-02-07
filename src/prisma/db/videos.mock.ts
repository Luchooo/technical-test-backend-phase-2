import type { Video } from '@my-types/'
export const videos: Video[] = [
  {
    id: '1ffa137b-931d-4c0f-b3fb-69cc83107ef1',
    title: 'Cat Video',
    description: 'Cat Video Private',
    url: 'https://www.youtube.com/shorts/Po098TRdOn4',
    createdAt: new Date(),
    isPublic: false,
    usersId: 'e4a8fabd-cd5c-4ea1-9ecf-a12380f80740'
  },
  {
    id: '879916e3-76f2-438f-b987-8a7bcae45963',
    title: 'Dog Video',
    description: 'Dog Video Public',
    url: 'https://www.youtube.com/shorts/IN0T1kyvGi4',
    createdAt: new Date(),
    isPublic: true,
    usersId: 'e4a8fabd-cd5c-4ea1-9ecf-a12380f80740'
  },
  {
    id: '69a35139-44a8-4e8d-95e8-37025f611086',
    title: 'Cat Video Maria',
    description: 'Cat Video Private Maria',
    url: 'https://www.youtube.com/shorts/TAo_CHchVnM',
    createdAt: new Date(),
    isPublic: false,
    usersId: 'df0cc617-9c56-4132-a6ea-38db2b72b19d'
  },
  {
    id: '6331baf1-b7b9-44da-9e2b-6e5e26527e54',
    title: 'Dog video maria public',
    description: 'Dog video public owner maria',
    url: 'https://www.youtube.com/shorts/BYESIhhrWSY',
    createdAt: new Date(),
    isPublic: true,
    usersId: 'df0cc617-9c56-4132-a6ea-38db2b72b19d'
  }
]
