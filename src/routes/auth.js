const express = require('express');
const router = express.Router();

//Controllers
const Auth = require('../controller/auth');

//Routes
router.post('/signIn', Auth.signIn);
router.post('/signUp', Auth.signUp);  
router.get('/testMessage', Auth.testMessage);  


module.exports = router;