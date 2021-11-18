const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { User } = require('../../models/user')

const usersDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const id = req.user._id.toString()
  const { path: tmpPath, originalname } = req.file
  const uploadPath = path.join(usersDir, id, originalname)

  try {
    const file = await Jimp.read(tmpPath)
    await file.resize(255, 255).write(tmpPath)
    await fs.rename(tmpPath, uploadPath)
    const avatarURL = `avatars/${id}/${originalname}`
    await User.findByIdAndUpdate(id, { avatarURL }, { new: true })

    return res.status(200).json({
      status: '200 OK',
      message: 'Avatar updated successfully',
      result: {
        avatarURL,
      }
    })
  } catch (error) {
    await fs.unlink(tmpPath)
    throw error
  }
}

module.exports = updateAvatar
