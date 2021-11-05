const { User } = require('../../models')
const { Conflict } = require('http-errors')

const signup = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }
  await User.create({ email, password, subscription })
  return res.status(201).send(
    {
      status: 'created',
      code: 201,
      message: 'success register',
      user: {
        email,
        subscription,
      }
    }
  )
}

module.exports = signup
