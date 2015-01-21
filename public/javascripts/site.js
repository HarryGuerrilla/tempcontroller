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
  var date = new Date();
  $.ajax({
    url: '/api/temp-data',
    success: function(data) {
      $('.loading').hide();
      $.plot($("#placeholder"), [data], {
        xaxis: {
          mode: "time",
          timezone: "browser",
          min: date - 604800000 ,
          max: date
        },
        yaxis: {
          min: 55,
          max: 90,
          tickSize: 1
        }
      });
    }
  });
  setTimeout(getChartData, 60000);
}
