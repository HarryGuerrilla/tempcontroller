var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp'),
    current_temp = 0;

/* GET home page. */
router.get('/', function(req, res) {
  temp.current(function(t){
    console.log('new temp: ' + t);
    current_temp = t;
    res.render('index', { title: 'TempContoller', temp: current_temp });
  });
});

module.exports = router;
