var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp'),
    data = require('../lib/data-sqlite');

/* GET users listing. */
router.get('/current-temp', function(req, res) {
  temp.current(function(current_temp){
    res.send({ current_temp: current_temp });
  });
});

router.get('/temp-data', function(req, res) {
  var today = (new Date).getTime();
  data.get(['batch', today - 604800000, -1], function(temp_data) {
    var temp_array = [];
    temp_data.forEach(function(data) {
      var reading = [data.time, data.temperature];
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
    temp_data.forEach(function(data) {
      var reading = [data.time, data.temperature];
      temp_array.push(reading);
    });
    res.send(temp_array);
  });
});

router.get('/', function(req, res) {

});

module.exports = router;
