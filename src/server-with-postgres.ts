import { createApp } from './index'
import { videoModel } from '@models/postgres/videos/videos.model'

export const { app, server } = createApp(videoModel)
