import express from 'express'
const  config = require('config')
import mongoose from 'mongoose'

const app = express()

const PORT = config.get('port')

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
