const fs = require('fs/promises')
const path = require('path')
const { body, validationResult } = require('express-validator')
const contacts = path.join(__dirname, './contacts.json')









const updatePutContact = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contacts, 'utf-8')
    const parseData = JSON.parse(data)

    const { name, email, phone } = req.body
    const id = String(req.params.contactId)

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing fields' })
    }

    await parseData.forEach(user => {
      if (user.id === id) {
        user.name = name
        user.email = email
        user.phone = phone
      }
    })
    await fs.writeFile(contacts, JSON.stringify(parseData, null, 2))

    return res.status(200).json({ message: 'ok' })
  } catch (error) {
    throw error
  }
}

// const updatePatchContact = async (req, res) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const data = await fs.readFile(contacts, 'utf-8')
//     const parseData = JSON.parse(data)

//     const { name, email, phone } = req.body
//     const contactId = String(req.params.contactId)

//     const updateContact = parseData.find((contact, ind) => {
//     if (contact.id === contactId)
//         contact.name = name
//         contact.email = email
//         contact.phone = phone
//       }  
//     )

//     await fs.writeFile(contacts, JSON.stringify(parseData, null, 2))

//     return res.status(200).json({ updateContact, message: 'ok' })
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  updatePutContact
}
