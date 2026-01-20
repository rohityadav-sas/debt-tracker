import express from 'express'
import webhook from './controllers/webhook.controller.js'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json())

app.use('/webhook', webhook)

app.use(express.static(path.join(__dirname, '../landing-page/out')))

export default app
