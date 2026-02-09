import express from 'express'
import cors from 'cors'
import { router } from './routes/index.js'

const app = express()

// Configs
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', router)

export { app }
