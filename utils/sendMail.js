const nodemailer = require('nodemailer')
const { InternalServerError } = require('http-errors')

const { EMAIL_PASSWORD, EMAIL_LOGIN } = process.env

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASSWORD,
  },
})

const sendMail = async (data) => {
  try {
    const email = { ...data, from: `"Fred Foo 👻" ${EMAIL_LOGIN}` }
    await transporter.sendMail(email)
  } catch (error) {
    console.log(error.message)
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
