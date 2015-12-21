var b = require('bonescript'),
    red_led = 'P8_19',
    green_led = 'P8_13';

b.pinMode(red_led, 'out');
b.pinMode(green_led, 'out');

var turnOff = function() {
  b.digitalWrite(green_led, 0);
  b.digitalWrite(red_led, 0);
};

module.exports = {
  on: function(color) {
    switch(color) {
      case 'RED':
        turnOff();
        b.digitalWrite(red_led, 1);
        break;
      case 'GREEN':
        turnOff();
        b.digitalWrite(green_led, 1);
        break;
      default:
        turnOff();
    }
  },
  off: function() {
    turnOff();
  }
};
