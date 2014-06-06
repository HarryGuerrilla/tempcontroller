#!/usr/bin/node --harmony

'use strict';

var b = require('bonescript'),
    data = require('./lib/data'),
    moment = require('moment'),
    resistor = 10010,
    led0 = "USR0",
    led1 = "USR1",
    led2 = "USR2",
    led3 = "USR3",
    read_count = 0,
    read_value = 0;

// turn off activity leds
b.pinMode(led0,b.OUTPUT);
b.digitalWrite(led0, b.LOW);
b.pinMode(led1,b.OUTPUT);
b.digitalWrite(led1, b.LOW);
b.pinMode(led2,b.OUTPUT);
b.digitalWrite(led2, b.LOW);
b.pinMode(led3,b.OUTPUT);
b.digitalWrite(led3, b.LOW);

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

function roundTemp(x) {
    return Math.round(resistance_to_fahrenheight(x) * 10)/10;
}

function printStatus(x) {
    console.log('Analog Value: ' + x);
    console.log('Resistance: ' + calculate_resistance(x));
    console.log('Temp: ' + roundTemp(x) + ' °F');
}

function get_temp(){
  average_read();
}

function average_read() {
  var sample = [];
  var total = 0;
  for (let i=0; i<5; i++) {
    b.analogRead('P9_40', function(x) {
        sample.push(x.value);
        if (sample.length == 5) {
            for (let s=0; s<5; s++) {total += sample[s];}
            storeTemp(total/sample.length);
            // printStatus(total/sample.length);
        }
    });
  }
}

function storeTemp(temp) {
    read_count += 1;
    read_value += temp;
    if (read_count % 20 == 0) {
        console.log('saving value: ' + read_value/20);
        let epoch = (new Date).getTime();
        let temp_object = "[ " + epoch + ", " + roundTemp(read_value/20) + " ]";
        data.save(['batch', epoch, temp_object]);
        read_value = 0;
        read_count = 0;
    }
}

function getData() {
    data.get(['batch', '0', '-1'], function(x) {
        console.log(x);
    });
}

// every 30 seconds get temp
var timer = setInterval(get_temp, 30000);

var stopTimer = function(){
    clearInterval(timer);
}

// setTimeout(stopTimer, 60000);
