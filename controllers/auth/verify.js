const { User } = require('../../models')
const { NotFound } = require('http-errors')

const verify = async(req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  return res.status(200).send({
    status: 'OK',
    message: 'Verification successful',
  })
}

module.exports = verify
