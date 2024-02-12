/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { type VideoModel } from '@my-types/*'
import { videoController } from '@controllers/videos/videos.ctrl'
import { requireAuthen } from '@App/middleware/require-authen.middleware'
import { checkQueryParams } from '@App/middleware/check-query-params'
import { handleGetAllVideos } from '@controllers/videos/handleGetAllVideos.ctrl'

export const videosRouter = (videosModel: VideoModel): Router => {
  const videosRouter = Router()
  const videoCtrl = videoController(videosModel)

  videosRouter.get('/public', videoCtrl.getAllPublic)
  videosRouter.get(
    '/',
    requireAuthen,
    checkQueryParams,
    handleGetAllVideos(videosModel)
  )
  videosRouter.get('/:id', requireAuthen, videoCtrl.getById)
  videosRouter.post('/', requireAuthen, videoCtrl.create)
  videosRouter.delete('/:id', requireAuthen, videoCtrl.delete)
  videosRouter.put('/:id', requireAuthen, videoCtrl.update)
  return videosRouter
}
