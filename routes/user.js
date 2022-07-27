const express = require('express');
const passport = require('passport');
const userController = require("../controllers/user");
const verifyLogin = require("../middlewares/verifyLogin");
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', passport.authenticate('local'), userController.login);
router.get('/auth', verifyLogin, userController.getAuth);
router.get('/logout', verifyLogin, userController.logout);

module.exports = router;