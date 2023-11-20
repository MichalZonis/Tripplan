const express = require('express');
const router = express.Router();
const { register, login, setAdmin, deleteUser, assertToken } = require("../controllers/auth")
const { validateAdmin, validateBasic } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/setAdmin', validateAdmin , setAdmin);
router.route('/deleteUser').delete(validateAdmin, deleteUser);
router.post('/assert', assertToken);
module.exports = router;