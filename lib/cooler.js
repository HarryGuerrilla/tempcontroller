#!/usr/bin/env node
var data = require('./data-sqlite'),
    b = require('bonescript');

var config = {
  offset: 1
};

var target = null;

function coolerOn() {
  console.log('Cooler On');
}

function coolerOff() {
  console.log('Cooler Off');
}

module.exports = {
  checkTemp: function(temp) {
    var offset = config.offset;
    console.log('Current temp: ' + temp + '°, target is: ' + target + '°, offset is: ' + offset + '°');
    if (temp <= (target - offset)) {
      coolerOff();
    } else if (temp >= (target + offset)) {
      coolerOn();
    };
  },
  target: function(temp) {
    target = temp;
  }
};
