const { User } = require('../../models')

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })

  return res.status(204).send({
    status: 'Success',
    code: 204,
    message: 'No Content'
  })
}

module.exports = logout
