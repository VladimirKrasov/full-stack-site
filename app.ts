const exprees = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = exprees()

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
