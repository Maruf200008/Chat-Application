const {check, validationResult} =  require('express-validator');
const createError = require('http-errors');
const User = require('../../model/People')
const {unlink} = require('fs')
const path = require('path')


const addUserValidator = [
    check("name")
    .isLength({min : 1})
    .withMessage("Name is required")
    .isAlpha("en-US", {ignore : "-"})
    .withMessage("Name must not contain anything other then alphabet")
    .trim(),

    check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
        try{
            const user = await User.findOne({email : value})
            if(user) {
                throw createError("Email alrady Exsit!!") 
            }
        }catch (err){
            throw createError(err.message)
        }
    }),


    check("mobile")
    .isMobilePhone("bn-BD", {
        strictMode : true
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
        try {
            const userPhone = await User.findOne({mobile : value})
            if(userPhone) {
                throw createError("Mobile Number Alrady Used")
            }
        }catch(err) {
            throw createError(err.message)
        }
    }),

    check("password")
    .isStrongPassword()
    .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 upercase, 1 number & 1 symbol")
]

const addUserValidatorHandlar = (req, res, next) => {
    const error = validationResult(req);
    const mappedError = error.mapped()
    if(Object.keys(mappedError).length === 0) {
        next()
    }else{
        if(req.files.length > 0) {
            const {filename} = req.files[0]    
            unlink(path.join(__dirname, `../../public/uploads/avatars/${filename}`), (err) => {
                if(err) {
                    console.log(err.message)
                }
            })    

        }
        res.status(500).json({
            error : mappedError
        })
    }
   
}

module.exports = {
    addUserValidator,
    addUserValidatorHandlar
}