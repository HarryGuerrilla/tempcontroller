var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp');

/* GET users listing. */
router.get('/current-temp', function(req, res) {
  temp.current(function(current_temp){
    res.send({ current_temp: current_temp });
  });
});

router.get('/', function(req, res) {

});

module.exports = router;
