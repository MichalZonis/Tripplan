const express = require('express');
const router = express.Router();
// const GameRouter = require('./game.route')

router.get('/', function (req, res) {
    res.send('API works!!!');
});


// router.use('/game', GameRouter);


module.exports = router;