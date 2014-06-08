var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TempContoller', temp: '' });
});

module.exports = router;
