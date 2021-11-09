const { User } = require('../../models/user')
const { BadRequest, NotFound } = require('http-errors')

const updateSubscription = async (req, res) => {
  const { subscription } = req.body
  const { _id, email } = req.user

  if (!subscription) {
    throw new BadRequest('Missing field "subscription"' + '12345')
  }

  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true })
  if (!result) {
    throw new NotFound()
  }

  return res.status(200).json({
    status: '200 OK',
    message: 'Subscription updated successfully',
    result: {
      email,
      subscription
    }
  })
}

module.exports = updateSubscription
