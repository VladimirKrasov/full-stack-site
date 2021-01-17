import express from 'express'
import mongoose from 'mongoose'
import { router } from './routes/auth.routes'
import * as bodyParser from 'body-parser'

const config = require('config')
const app = express()
const PORT = config.get('port')

// Apply midleware
app.use(bodyParser.json())
app.use('/api/auth/', router)

const  start = async() => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error:', e.message)
    process.exit(1)
  }
}

start()
