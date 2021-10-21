const fs = require('fs/promises')
const filePath = require('./filePath')


const getAll = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log('filePath', filePath)
    const data = await fs.readFile(filePath, 'utf-8')
    const parseData = JSON.parse(data)
    // console.log(parseData)
    return parseData
  } catch (error) {
    throw error
  }
}

module.exports = getAll
