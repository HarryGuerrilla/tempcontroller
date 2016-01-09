var b = require('bonescript'),
    math = require('mathjs'),
    async = require('async'),
    w1_interface = '/sys/bus/w1/devices/28-000005d8ac24/w1_slave',
    MCP9808 = new require('mcp9808');

function celciusToFarenheight(C) {
  var F = (((9/5)*C)+32);
  return F;
}

function averageTemps(callback){
  var err = null;
  async.series([
    function(clbk){
      read_w1(function(temp){
        err = temp !== null ? null : "No Reading";
        clbk(err, temp);
      });
    },
    function(clbk){
      read_w1(function(temp){
        err = temp !== null ? null : "No Reading";
        clbk(err, temp);
      });
    },
    function(clbk){
      read_w1(function(temp){
        err = temp !== null ? null : "No Reading";
        clbk(err, temp);
      });
    }
  ],
  function(err, results){
    if (err) {
      callback(null);
    } else {
      callback(math.median(results));
    }
  });
}

function read_w1(callback) {
  b.readTextFile(w1_interface, function(x){
    if(x.err || x.data.split("t=")[1] == 0) {
      console.log('ERROR: Temperature probe disconnected.');
      console.log('ERROR CODE: ' + x.err);
      callback(null);
    } else {
      var C = x.data.split("t=");
      C = C[1]/1000;
      var F = celciusToFarenheight(C);
      callback(Math.round(F*10)/10);
    }
  });
}

module.exports = {
  current: function (callback){
    averageTemps(function(temp){
      callback(temp);
    });
  },
  ambient: function(callback){
    MCP9808.Initialize(function(){
      MCP9808.AmbientTemperature(function(error,C){
        if (error) {
          console.log('ERROR: Ambient Temperature Sensor ERROR.');
          console.log('ERROR CODE: ' + error);
          callback(null);
        } else {
          var F = celciusToFarenheight(C);
          callback(F);
        }
      });
    });
  }
};
