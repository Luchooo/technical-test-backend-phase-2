import { createApp } from './index'
import { authModel, userModel, videoModel } from '@models/postgres/index.model'

export const { app, server } = createApp({ authModel, userModel, videoModel })
