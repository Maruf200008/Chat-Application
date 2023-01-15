const createError = require('http-errors')

const notFoundHandlar = (req, res, next) => {
    next(createError(404, 'Your request content was not found!!'))
}

const errorHandlar = (err, req, res, next) => {
    res.locals.error = {
        message : err.message,
        status : err.status
    }

    if(res.locals.html) {
        res.render('error', {
            title : 'Error'
        })
    }else {
        res.json(res.locals.error)
    }
}

module.exports = {
    notFoundHandlar,
    errorHandlar
}