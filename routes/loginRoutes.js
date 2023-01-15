// external import
const express = require('express');
const decoreteHtmlRespons = require('../middlewares/common/decoreteHtmlResponse')


// internal import 
const {getlogin} = require('../controller/loginController')

const route = express.Router();

route.get('/', decoreteHtmlRespons('Login'),  getlogin);

module.exports = route;