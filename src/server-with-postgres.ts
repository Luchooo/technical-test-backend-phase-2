import { createApp } from './index'
import { userModel, videoModel } from '@models/postgres/index.model'

export const { app, server } = createApp({ userModel, videoModel })
