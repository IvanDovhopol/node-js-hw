const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', imageName);

    const file = await Jimp.read(resultUpload);
    file.resize(250, 250).write(resultUpload);

    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({
      success: true,
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
