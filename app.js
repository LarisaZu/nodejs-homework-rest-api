const express = require('express')
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()

const { contactsRouter, usersRouter } = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// app.use((err, _, res, __) => {
//   res.status(500).json({ message: err.message })
// })

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ status: 'error', code: status, message })
})

module.exports = app
