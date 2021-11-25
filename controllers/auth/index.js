const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const resending = require('./resending')

module.exports = {
  signup,
  login,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resending
}
