import { createApp } from './index'
import { authModel, userModel } from '@models/postgres/index.model'
import { videoModel } from '@models/postgres/videos.model'

export const { app, server } = createApp({ authModel, userModel, videoModel })
