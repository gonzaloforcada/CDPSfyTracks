var express = require('express');
var router = express.Router();
var multer  = require('multer');

var tracks_dir = process.env.TRACKS_DIR || './media/';

var trackController = require('../controllers/track_controller');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/tracks/:name', trackController.buscaCancion);

router.post('/tracks', trackController.guardaCancion);

router.delete('/tracks/:name', trackController.borraCancion);

module.exports = router;