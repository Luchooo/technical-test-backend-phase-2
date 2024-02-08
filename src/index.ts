/* eslint-disable @typescript-eslint/explicit-function-return-type */

import cors from 'cors'
import express, { json } from 'express'
import morgan from 'morgan'
import { videosRouter, usersRouter } from '@routes/index.routes'
import { handleAppError } from './middleware/handle-app-error.middleware'
import { print } from '@config/logger'
import type { Models } from '@my-types/'

export const createApp = ({ userModel, videoModel }: Models) => {
  const app = express()
  app.use(cors())
  app.use(morgan('dev'))
  app.use(json())
  app.disable('x-powered-by')

  app.use('/api/users/', usersRouter(userModel))
  app.use('/api/videos/', videosRouter(videoModel))

  app.use('/*', function (_req, res) {
    res.status(404).send('Sorry cant find that!')
  })

  app.use(handleAppError)

  const PORT = process.env.PORT ?? 3000

  const server = app.listen(PORT, () => {
    print.info(`Server running on: http://localhost:${PORT}`)
  })

  return { app, server }
}
