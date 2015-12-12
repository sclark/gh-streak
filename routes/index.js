var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

router.get('/', function(req, res, next) {
  Game.find({}).exec(function(e, games) {
    res.render('index', {games: games});
  });
});

router.get('/game/:game', function(req, res, next) {
  Game.findOne({name: req.params.game}).exec(function(e, game) {
    game.max = 0;
    game.players.forEach(function(e, i, arr) {
      if (e.streak > game.max) game.max = e.streak;
    });
    game.players.forEach(function(e, i, arr) {
      if (e.streak >= game.max) e.status = "good";
      else if (e.streak >= game.max-5) e.status = "warn";
      else e.status = "bad";
    });
    res.render('game', {game: game});
  });
});

router.post('/game/:game', function(req, res, next) {
  var player_name = req.body.head_commit.author.username;
  var player_date = req.body.head_commit.timestamp;
  console.log(req.body);
  Game.findOne({name: req.params.game}).exec(function(e, game) {
    game.players.forEach(function(e, i, arr) {
      if (e.name == player_name && new Date(e.last).getDate() != new Date(player_date).getDate()) {
        Game.update({name: req.params.game, 'players.name': e.name}, {$set: {'players.$.last': player_date}, $inc: {'players.$.streak': 1}}, function (e, status) {
          res.send();
        });
      }
    });
    res.send();
  });
});

module.exports = router;
