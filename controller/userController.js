const bcrypt = require('bcrypt');
const User = require('../model/People')



const getUser = (req, res, next) => {
    res.render('users')
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
        res.end()
               
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

module.exports = {
    getUser,
    addUser
}