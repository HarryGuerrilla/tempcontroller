$(document).ready(function(){
  checkTemp();
  getChartData();
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

function getChartData() {
  $.ajax({
    url: '/api/temp-data',
    success: function(data) {
      $.plot($("#placeholder"), [data], {
        xaxis: {
          mode: "time",
          timezone: "browser"
        }
      });
    }
  });
  setTimeout(getChartData, 5000)
}
