import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
import path, { dirname } from 'path'
import bodyParser from 'body-parser'

import { fileURLToPath } from 'url'

// routes
import v1_router from './routes/v1/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000
// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
})

const logger = morgan('combined', { stream: accessLogStream })

app.use(helmet())
app.use(cors())
app.use(logger)
app.use(bodyParser.json())

app.use('/api/v1', v1_router)

app.listen(PORT, () => {
  console.log('⚡ Server online - port:', PORT)
})
