var b = require('bonescript'),
    w1_interface = '/sys/bus/w1/devices/28-000005d8ac24/w1_slave';

function read_w1(callback) {
  b.readTextFile(w1_interface, function(x){
    var C = x.data.split("t=");
    C = C[1];
    var F = (((9/5)*C)+32000)/1000;
    callback(Math.round(F*10)/10);
  });
}

module.exports = {
  current: function (callback){
    read_w1(function(temp){
      callback(temp);
    });
  }
};
