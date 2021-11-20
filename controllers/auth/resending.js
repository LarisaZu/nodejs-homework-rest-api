const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const { sendMail } = require('../../utils')

const { PORT = 3000 } = process.env

const resending = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User not found')
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const { verifyToken } = user
  const data = {
    to: email,
    subject: 'Repeated verification email',
    html: `<h2>Hello, ${email}!</h2>
    <p>You&#8217;re almost ready to start enjoying Phonebook. </br>
Simply click the <a href="http://localhost:${PORT}/api/users/verify/${verifyToken}">link</a> to verify your email address.</p>
</br> See you there!`
  }
  await sendMail(data)
  return res.status(200).send({
    status: 'OK',
    message: 'Verification email sent',
  })
}

module.exports = resending
