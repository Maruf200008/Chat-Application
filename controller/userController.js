// external import 
const bcrypt = require('bcrypt');
const path = require('path')
const {unlink} = require('fs')

// internal import 
const User = require('../model/People')






const getUser = async (req, res, next) => {
    try{
        const newUser = await User.find();
        res.render('users', {
            users : newUser
        })
    }catch(err) {
        console.log(err)

    }
}

const addUser = async (req, res, next) => {
   
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
  
    if(req.files && req.files?.length > 0) {
        newUser =  new User({
            ...req.body,
            avatar : req.files[0].filename,
            password : hashPassword
        })
    }else {
        newUser =  User({
            ...req.body,
            password : hashPassword
        })
    }
    try{
        const result = await newUser.save();
        res.status(200).json({
            message : "User was create sucessfully!!"
        })
               
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            errors : {
                common : {
                    message : err.message
                }
            }
        })

    }
}

const removeUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({_id : req.params.id})
        if(user.avatar) {
            unlink(path.join(__dirname,`/./public/uploads/avatars/${user.avatar}`), (err) => {
                if(err) {
                    console.log(err.message)
                }
            })

        }

        res.status(200).json({
            message : "User deleted sucessfully"
        })

    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : {
                avatar : {
                    message : "User not deleted uscessfully"
                }
            }
        })
    }
}

module.exports = {
    getUser,
    addUser,
    removeUser
}