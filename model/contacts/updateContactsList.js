const fs = require('fs/promises')
const filePath = require('./filePath')

const updateContactsList = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2))
}

module.exports = updateContactsList
