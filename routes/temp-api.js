var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp'),
    data = require('../lib/data');

/* GET users listing. */
router.get('/current-temp', function(req, res) {
  temp.w1_current(function(current_temp){
    res.send({ current_temp: current_temp });
  });
});

router.get('/temp-data', function(req, res) {
  data.get(['batch', 0, -1], function(temp_data) {
    var temp_array = [];
    temp_data.forEach(function(reading) {
      reading = JSON.parse(reading);
      temp_array.push(reading);
    });
    data.downSample(temp_array, 1000, function(d){
      res.send(d);
    });
  });
});

router.get('/all-temp-data', function(req, res) {
  data.get(['batch', 0, -1], function(temp_data) {
    var temp_array = [];
    temp_data.forEach(function(reading) {
      reading = JSON.parse(reading);
      temp_array.push(reading);
    });
    res.send(temp_array);
  });
});

router.get('/', function(req, res) {

});

module.exports = router;
