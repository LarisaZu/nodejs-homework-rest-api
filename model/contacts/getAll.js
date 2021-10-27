const fs = require('fs/promises')
const filePath = require('./filePath')

const getAll = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const parseData = JSON.parse(data)
    return parseData
  } catch (error) {
    throw error
  }
}

module.exports = getAll
