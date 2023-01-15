const multer = require('multer');
const path = require('path')
const createError = require('http-errors')

const uploders = (subfolder_path, allow_file_type, file_size, error_message) => {
    
   const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`
  

   const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, UPLOADS_FOLDER)
    },
    filename:  (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + "-" + 
        Date.now()
      cb(null, filename + fileExt)
    }
  })

  const upload = multer({
    storage : storage,
    limits : {
        file_size
    },
    fileFilter :(req, file, cb) => {
        if(allow_file_type.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(createError(error_msg))
        }

    }
  })

  return upload
}

module.exports = uploders