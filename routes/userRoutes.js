// external import
const express = require('express');
const {addUserValidator, addUserValidatorHandlar} = require('../middlewares/users/userValidator')
const {addUser} = require('../controller/userController')


// internal import 
const {getUser} = require('../controller/userController')
const decoreteHtmlRespons = require('../middlewares/common/decoreteHtmlResponse')
const avatarUplods = require('../middlewares/users/avatarUplods')


const route = express.Router();

route.get('/', decoreteHtmlRespons('User'), getUser);
route.post('/', avatarUplods, addUserValidator, addUserValidatorHandlar, addUser);


module.exports = route;