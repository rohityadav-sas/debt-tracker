import express from 'express'
import webhook from './controllers/webhook.controller.js'

const app = express()

app.use(express.json())

app.use('/webhook', webhook)

app.get('/', (_, res) => res.send('Track My Debt!'))

export default app
