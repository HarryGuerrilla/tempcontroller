var express = require('express'),
    router = express.Router(),
    temp = require('../lib/temp'),
    data = require('../lib/data-sqlite');

/* GET home page. */
router.get('/', function(req, res) {
  data.target('batch', function(target){
    var target = target.temperature;
    console.log("target is: " + target);
    res.render('index', { title: 'TempContoller',
                          temp: '',
                          target: target});
  });
});

router.post('/', function(req, res) {
  if (req.body.edit == "Clear") {
    data.clear('batch');
  }
  res.redirect('back');
});

router.post('/target', function(req, res) {
  req.flash('message', 'Updated Target Temperature');
  var args = ['batch', Date.parse(new Date()), req.body.target];
  data.updateTarget(args, function(){
    res.redirect('back');
  });
});

module.exports = router;
