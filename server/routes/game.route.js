const express = require('express');
const GameRouter = express.Router();

// const Game = require('../models/game')
// var ctrlGame = require('../controllers/game.controller');

// TODO: this is a template for a controller. create new ones beased on this one and rename or delete this on as needed

// GameRouter.get('/', function (req, res) {
//     Game.find({})
//     .then(game => res.send(game))
//     .catch((error) => console.log(error))
// });

// GameRouter.get('/check', function (req, res) {
//     res.send('games works!');
// });

// GameRouter.get('/user/:userID', ctrlGame.getPuzzlesByUser);

// GameRouter.get('/:Width/:Height', ctrlGame.getPuzzleBySize, ctrlGame.calculateHints);

module.exports = GameRouter;