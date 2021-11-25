const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { Conflict } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../utils')

const usersDir = path.join(__dirname, '../../', 'public/avatars')
const { PORT = 3000 } = process.env

const signup = async (req, res) => {
  const { email } = req.body
  const url = gravatar.url(email, { d: 'wavatar' }, true)
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = { ...req.body, avatarURL: url, verifyToken: uuidv4() }

  const { verifyToken } = newUser
  const data = {
    to: email,
    subject: 'Verification email',
    html: `<h2>Hello, ${email}!</h2>
    <p>You&#8217;re almost ready to start enjoying Phonebook. </br>
Simply click the <a href="http://localhost:${PORT}/api/users/verify/${verifyToken}">link</a> to verify your email address.</p>
</br> See you there!`
  }
  await sendMail(data)

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
