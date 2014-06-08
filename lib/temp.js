var b = require('bonescript'),
    resistor = 10010;

function average_read(callback) {
  var sample = [];
  var total = 0;
  for (var i=0; i<5; i++) {
    b.analogRead('P9_40', function(x) {
        sample.push(x.value);
        if (sample.length == 5) {
            for (var s=0; s<5; s++) {total += sample[s];}
            callback(roundTemp(total/sample.length));
        }
    });
  }
}

function roundTemp(x) {
    return Math.round(resistance_to_fahrenheight(x) * 10)/10;
}

function resistance_to_fahrenheight(x) {
    var steinhart = calculate_resistance(x)/10000;
    steinhart = Math.log(steinhart);
    steinhart /= 3950;
    steinhart += 1.0 / (298.15);
    steinhart = 1/steinhart;
    steinhart -= 273.15;
    var f = steinhart*(9/5)+32;
    return f;
}

function calculate_resistance(analogValue) {
    return ((resistor * (1-analogValue))/analogValue);
}

module.exports = {
  current: function (callback) {
    average_read(function (temp) {
      callback(temp);
    });
  }
};
