const fs = require('fs/promises')
const path = require('path')
const contacts = path.join(__dirname, './contacts.json')

const listContacts = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contacts, 'utf-8')
    const parseData = JSON.parse(data)
    // console.table(JSON.parse(data))
    // console.log(JSON.parse(data))
    res.status(200).json(parseData)
    return parseData
  } catch (error) {
    throw error
  }
}

const getContactById = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { contactId } = req.params
    const data = await fs.readFile(contacts, 'utf-8')
    const parseData = JSON.parse(data)
    const contactById = await parseData.find(
      contact => contact.id === Number(contactId),
    )
    if (!contactById) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json(contactById)
    return contactById
  } catch (error) {
    throw error
  }
}

const removeContact = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { contactId } = req.params
    const data = await fs.readFile(contacts, 'utf-8')
    const parseData = JSON.parse(data)
    const contactById = await parseData.find(
      contact => contact.id === Number(contactId),
    )
    const newListContacts = await parseData.filter(
      contact => contact.id !== Number(contactId)
    )
    if (!contactById) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ message: 'contact deleted' })
    return await fs.writeFile(contacts,
      JSON.stringify(newListContacts, null, 2))
  } catch (error) {
    throw error
  }
}

const addContact = async body => {

}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
