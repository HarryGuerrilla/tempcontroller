var socket = io();
$(document).ready(function(){
  getChartData();

  socket.on('temp reading', function(reading){
    $('#temp').text(reading);
  });

  socket.on('update chart', getChartData());
});

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
}
