const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const { Conflict } = require('http-errors')

const usersDir = path.join(__dirname, '../../', 'public/avatars')

const signup = async (req, res) => {
  const { email } = req.body
  const url = gravatar.url(email, { d: 'wavatar' }, true)
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = { ...req.body, avatarURL: url }
  const createdUser = await User.create(newUser)

  const id = createdUser._id.toString()
  const dirPath = path.join(usersDir, id)
  await fs.mkdir(dirPath)

  return res.status(201).send(
    {
      status: 'created',
      code: 201,
      message: 'success register',
      user: {
        email,
        subscription: createdUser.subscription,
      }
    }
  )
}

module.exports = signup
