$(document).ready(function(){
  checkTemp();
  getChartData();
});

function checkTemp() {
  $.ajax({
    url: '/api/current-temp',
    success: function(data) {
      $('#temp').text(data['current_temp'].toFixed(1));
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
        },
        yaxis: {
          min: 40,
          max: 90
        }
      });
    }
  });
  setTimeout(getChartData, 5000);
}
