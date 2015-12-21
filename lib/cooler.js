#!/usr/bin/env node
var data = require('./data-sqlite'),
    led = require('./led'),
    b = require('bonescript');

var config = {
  offset: 1
};

var target = null;

function coolerOn() {
  console.log('Cooler On');
  led.on("GREEN");
}

function coolerOff() {
  console.log('Cooler Off');
  led.off();
}

module.exports = {
  checkTemp: function(temp) {
    var offset = config.offset;
    console.log('Current temp: ' + temp + '°, target is: ' + target + '°, offset is: ' + offset + '°');
    if (temp >= (target + offset)) {
      coolerOn();
    } else {
      coolerOff();
    };
  },
  target: function(temp) {
    target = temp;
  }
};
