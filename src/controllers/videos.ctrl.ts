import type {
  VideoModel,
  VideoController,
  VideoCreatePayload,
  VideoUpdatePayload
} from '@my-types/*'
import { schemaCreateVideo } from '@schemas/video-create'
import { schemaUpdateVideo } from '@schemas/video-update'
import { validatePayload } from '@utils/validate-schema'

export const videoController = (videoModel: VideoModel): VideoController => {
  return {
    getAllPublic: async (_req, res, next) => {
      try {
        const videosPublic = await videoModel.getAllPublic()
        res.json(videosPublic)
      } catch (e) {
        next(e)
      }
    },

    getAll: async (_req, res, next) => {
      try {
        const videos = await videoModel.getAll()
        res.json(videos)
      } catch (e) {
        next(e)
      }
    },

    getById: async (req, res, next) => {
      try {
        const { id } = req.params
        const video = await videoModel.getById({ id })
        res.json(video)
      } catch (e) {
        next(e)
      }
    },

    create: async (req, res, next) => {
      try {
        const userId = req.user.id
        const payload = await validatePayload<VideoCreatePayload>(
          schemaCreateVideo,
          req.body
        )
        const newVideo = await videoModel.create({ payload, userId })
        res.status(201).json(newVideo)
      } catch (e) {
        next(e)
      }
    },

    delete: async (req, res, next) => {
      try {
        const { id } = req.params
        await videoModel.delete({ id })
        res.json({ message: 'Video deleted successfully' })
      } catch (e) {
        next(e)
      }
    },

    update: async (req, res, next) => {
      try {
        const { id } = req.params
        const userId = req.user.id
        const payload = await validatePayload<VideoUpdatePayload>(
          schemaUpdateVideo,
          req.body
        )
        const updatedVideo = await videoModel.update({ id, userId, payload })
        res.json(updatedVideo)
      } catch (e) {
        next(e)
      }
    }
  }
}
