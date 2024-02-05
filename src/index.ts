import cors from 'cors'
import express, { json } from 'express'
import morgan from 'morgan'
import { type Models } from '@my-types/'
import { createVideosRouter } from '@routes/videos.routes'
import { createUsersRouter } from '@routes/users.routes'
import { print } from '@config/logger'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createApp = ({ videoModel, userModel }: Models) => {
  const app = express()
  app.use(cors())
  app.use(morgan('dev'))
  app.use(json())
  app.disable('x-powered-by')

  app.use('/api/users/', createUsersRouter(userModel))
  app.use('/api/videos/', createVideosRouter(videoModel))

  app.use(function (_req, res) {
    res.status(404).send('Sorry cant find that!')
  })

  const PORT = process.env.PORT ?? 3000

  const server = app.listen(PORT, () => {
    print.info(`Server running on: http://localhost:${PORT}`)
  })

  return { app, server }
}
