const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const req = require('express/lib/request');
const users = require('../controllers/users')



router.get('/register', users.renderRegister)

router.post('/register', catchAsync(users.register));

router.get('/login', users.renderlogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)


module.exports = router;

//passport willl showing mongooose mss=g like if a user is already registerd