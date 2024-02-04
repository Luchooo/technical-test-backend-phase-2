import { type Request, type Response } from 'express'
import { type VideoModel, type VideoController } from '@my-types/*'
import { handleError } from '@utils/errorHandler'
import { validatePartialVideo, validateVideo } from '@schemas/videos'

export const videoController = (videoModel: VideoModel): VideoController => {
  return {
    getAllPublic: async (_req: Request, res: Response) => {
      try {
        const videosPublic = await videoModel.getAllPublic()
        res.json(videosPublic)
      } catch (e) {
        await handleError(res, e)
      }
    },

    getAll: async (_req: Request, res: Response) => {
      try {
        const videos = await videoModel.getAll()
        res.json(videos)
      } catch (e) {
        await handleError(res, e)
      }
    },

    getById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params
        const video = await videoModel.getById({ id })
        res.json(video)
      } catch (e) {
        await handleError(res, e)
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const result = await validateVideo(req.body)
        if (!result.success) throw new Error(result.error.message)
        const newVideo = await videoModel.create({ input: result.data })
        res.status(201).json(newVideo)
      } catch (e) {
        await handleError(res, e)
      }
    },

    delete: async (req: Request, res: Response) => {
      try {
        const { id } = req.params
        await videoModel.delete({ id })
        res.json({ message: 'Video deleted successfully' })
      } catch (e) {
        await handleError(res, e)
      }
    },

    update: async (req: Request, res: Response) => {
      try {
        const result = await validatePartialVideo(req.body)

        if (!result.success) throw new Error(result.error.message)

        const { id } = req.params
        const updatedVideo = await videoModel.update({ id, input: result.data })
        res.json(updatedVideo)
      } catch (e) {
        await handleError(res, e)
      }
    }
  }
}
