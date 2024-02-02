import { Router } from 'express'

export const emojisrouter = Router()

emojisrouter.get('/', (_req, res) => {
  res.json(['😀', '✔️'])
})

export default { emojisrouter }
