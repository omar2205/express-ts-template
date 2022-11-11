import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send({ msg: 'api/v1' })
})

export default router