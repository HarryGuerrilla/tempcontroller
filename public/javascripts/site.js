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
    xhr: function() {
       var xhr = new window.XMLHttpRequest();
       xhr.addEventListener("progress", function(evt) {
           if (evt.lengthComputable) {
               var percentComplete = evt.loaded / evt.total;
               $('.progress-bar').css('width', percentComplete * 100 + '%');
           }
       }, false);
       return xhr;
    },
    url: '/api/temp-data',
    success: function(data) {
      $.plot($("#placeholder"), [data], {
        xaxis: {
          mode: "time",
          timezone: "browser",
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
