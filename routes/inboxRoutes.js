// external import 
const express = require('express');

// internal import
const {getInbox} = require('../controller/inboxController');
const decoreteHtmlRespons = require('../middlewares/common/decoreteHtmlResponse')



const route = express.Router();

route.get('/', decoreteHtmlRespons('Inbox'), getInbox)

module.exports = route