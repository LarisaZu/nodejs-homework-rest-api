const { Contact } = require('../../models/contact')

const getAll = async (req, res) => {
  const { limit = 10, page = 1, favorite } = req.query

  const result = await Contact.paginate(
    { owner: req.user._id, ...(favorite && { favorite }) },
    {
      limit,
      page,
      favorite,
      populate:
      {
        path: 'owner',
        select: '_id email'
      }
    },
  )
  const { docs: contacts, totalDocs, limit: myLimit, page: myPage } = result
  return res.status(200).json({ contacts, totalDocs, myLimit, myPage })
}

module.exports = getAll
