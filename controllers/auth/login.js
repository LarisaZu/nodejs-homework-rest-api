const bcrypt = require('bcryptjs')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }

  const compareResult = await bcrypt.compare(password, user.password)
  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }
  const payload = {
    id: user._id
  }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })

  return res.status(200).send(
    {
      status: 'OK',
      token,
      user: {
        email,
        subscription: user.subscription,
      }
    }
  )
}

module.exports = login
