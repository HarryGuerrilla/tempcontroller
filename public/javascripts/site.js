$(document).ready(function(){
  checkTemp();
  var data = [[-373597200000, 315.71], [-370918800000, 317.45], [-368326800000, 317.50], [-363056400000, 315.86], [-360378000000, 314.93]];
  $.plot($("#placeholder"), [data], {
    xaxis: {
      mode: "time",
      timezone: "browser"
    }
  });
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
