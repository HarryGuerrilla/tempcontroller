$(document).ready(function(){
  setTimeout(checkTemp, 5000);
});

function checkTemp() {
  $.ajax({
    url: '/api/current-temp',
    success: function(data) {
      $('#temp p').text('Current temp is: ' + data['current_temp']);
    }
  });
  setTimeout(checkTemp, 5000);
}
