const express = require('express');
const router = express.Router();
const { register, login, setAdmin, deleteUser } = require("../controllers/auth")
const { validateAdmin } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/setAdmin', validateAdmin , setAdmin);
router.route('/deleteUser').delete(validateAdmin, deleteUser);
module.exports = router;