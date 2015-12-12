var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/game/:game', function(req, res, next) {
  res.render('game', {game: {name: "stever-2", players: [{name: "sclark", streak: "7 days", status: "good"}, {name: "ianlo", streak: "7 days", status: "warn"}]}});
});

module.exports = router;
