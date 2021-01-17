const exprees = require('express')
const config = require('config')

const app = exprees()

const PORT = config.get('port')

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))