var b = require('bonescript');
var resistor = 10010;

b.analogRead('P9_40', printStatus);

function calculate_resistance(analogValue) {
    return ((resistor * (1-analogValue))/analogValue);
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

function printStatus(x) {
    console.log('Analog Value: ' + x.value);
    console.log('Resistance: ' + calculate_resistance(x.value));	
    console.log('Temp: ' + Math.round(resistance_to_fahrenheight(x.value)) + ' °F');
    console.log('x.err = ' + x.err);
}

