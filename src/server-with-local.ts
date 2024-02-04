import { createApp } from './index'
import { videoModel } from '@models/local-file-system/videos/videos.model'

export const { app, server } = createApp(videoModel)
