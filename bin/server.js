const mongoose = require('mongoose')
const colors = require('colors')
const app = require('../app')
require('dotenv').config()

const { DB_HOST, PORT = 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
},
console.log('Database connection successful'.bgBlue)
)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.bgRed)
    })
  })
  .catch(error => {
    console.log('error', error.message)
    process.exit(1)
  })
