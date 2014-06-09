var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp'),
    data = require('../lib/data');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TempContoller', temp: '' });
});

router.post('/', function(req, res) {
  if (req.body.edit == "Clear") {
    data.clear('batch');
  }
  res.redirect('back');
});

module.exports = router;
