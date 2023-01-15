const uploders = require('../../utils/singleUpload')

const avatarUplods = (req, res, next) => {
    const upload = uploders(
        'avatars',
        ['image/jpg', 'image/jpeg', 'image/png'],
        100000,
        'Only .jpg .jpeg or .png file allow'
        )

        // call the middleware function
        upload.any()(req, res, (err) => {
            if(err) {
                res.status(500).json({
                    error : {
                        avatar : {
                            message : err.message
                        }
                    }
                })
            } else{
                next();
            }
        })
}

module.exports = avatarUplods