#!/usr/bin/node --harmony

'use strict';

var b = require('bonescript'),
    resistor = 10010;

function calculate_resistance(analogValue) {
    return ((resistor * (1-analogValue))/analogValue);
}

function resistance_to_fahrenheight(x) {
    let steinhart = calculate_resistance(x)/10000;
    steinhart = Math.log(steinhart);
    steinhart /= 3950;
    steinhart += 1.0 / (298.15);
    steinhart = 1/steinhart;
    steinhart -= 273.15;
    let f = steinhart*(9/5)+32;
    return f;
}

function printStatus(x) {
    console.log('Analog Value: ' + x);
    console.log('Resistance: ' + calculate_resistance(x));
    console.log('Temp: ' + Math.round(resistance_to_fahrenheight(x) * 10)/10 + ' °F');
}

function get_temp(){
  var sample = [];
  for (let i=0;i<5;i++) {
      b.analogRead('P9_40', function(x){
          sample.push(x.value);
          if (sample.length == 5) {
	    var total = 0;
	    for (let s=0;s<5;s++) {total += sample[s];}
	    printStatus(total/sample.length);
	  }
      });
  }
}

get_temp();
