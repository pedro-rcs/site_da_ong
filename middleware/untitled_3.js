const multer = require('multer')
const fs = require('fs')

module.exports = (multer({

  storage: multer.diskStorage({
      
    destination: (req, file, cb) => {
      let dir2 = './public/imgs'

      if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
      }
      
      cb(null, dir2)
    },

    filename: (req, file, cb) => {

      let newPath = file.originalname.split('.')[0] + '.webp'
      cb(null, file.originalname)
    },      
  }),

  fileFilter: (req, file, cb) => {

    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype );

    if (isAccepted) return cb(null, true)
    return cb(null, false)
  }
  
}))