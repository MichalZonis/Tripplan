const express = require('express');
const router = express.Router();
const GameRouter = require('./game.route')
const AuthRouter = require('./auth.route')

router.get('/', function (req, res) {
    res.send('API works!!!');
});


router.use('/game', GameRouter);
router.use('/auth', AuthRouter);

module.exports = router;