#!/usr/bin/env node
var data = require('./data-sqlite'),
    led = require('./led'),
    b = require('bonescript'),
    exec = require('child_process').exec;

var config = {
  offset: 1
};

var target = null,
    ambient = null;

function coolerOn() {
  console.log('Cooler On');
  led.on('GREEN');
}

function coolerOff() {
  console.log('Cooler Off');
  led.off();
}

module.exports = {
  checkTemp: function(temp) {
    var offset = config.offset;
    console.log('Current temp: ' + temp + '°, target is: ' + target + '°, offset is: ' + offset + '°, ambient is: ' + ambient + '°');
    exec('python lib/display.py -c ' + temp + ' -t ' + target, function(err, stdout, stderr){
      if (err !== null) {
        console.log(err);
      }
    });
    if (temp >= (target + offset) && temp !== null) {
      coolerOn();
    } else {
      coolerOff();
    };
  },
  target: function(temp) {
    target = temp;
  },
  ambient: function(temp) {
    ambient = temp;
  }
};
