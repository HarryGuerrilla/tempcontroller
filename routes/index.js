var express = require('express'),
    router = express.Router(),
    util = require('util'),
    temp = require('../lib/temp'),
    data = require('../lib/data-sqlite');

/* GET home page. */
router.get('/', function(req, res) {
  data.target('batch', function(target){
    var target = target.temperature;
    console.log("target is: " + target);
    res.render('index', { title: 'TempContoller',
                          temp: '',
                          target: target,
                          messages: req.flash()
                        });
  });
});

router.post('/', function(req, res) {
  if (req.body.edit == "Clear") {
    data.clear('batch');
  }
  res.redirect('back');
});

router.post('/target', function(req, res) {
  req.assert('target', 'Invalid Target Temp').notEmpty().isFloat();
  req.assert('target', 'Temperature Not in Range.  Must be between 35 and 99 F.').isBetween(35,99);
  var errors = req.validationErrors();
  if(errors){
    req.flash('errors', errors);
    res.redirect('back');
  } else {
    var date = Date.parse(new Date());
    var new_target = Math.round(req.body.target * 10)/10;
    data.target('batch', function(target){
      var old_target = target.temperature;
      var args_current = ['batch', date - 1, old_target];
      var args_new = ['batch', date, new_target];
      data.updateTarget(args_current, function(){
        data.updateTarget(args_new, function(){
          req.app.locals.targetEmitter.emit('change', args_new[2]);
          req.flash('success', 'Updated Target Temperature');
          res.redirect('back');
        });
      });
    });
  }
});

module.exports = router;
