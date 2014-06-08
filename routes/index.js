var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp');

/* GET home page. */
router.get('/', function(req, res) {
  temp.current(function(current_temp){
    res.render('index', { title: 'TempContoller', temp: current_temp });
  });
});

module.exports = router;
