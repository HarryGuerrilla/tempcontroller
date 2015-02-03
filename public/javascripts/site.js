var socket = io();
$(document).ready(function(){
  getChartData();

  socket.on('temp reading', function(reading){
    $('#temp').text(reading);
  });

  socket.on('update chart', function(reading){
    getChartData();
  });

  $('#target').addClass('col-xs-8').css('text-align', 'right')
              .after('<div class="col-xs-4 buttons"></div>');
  $('.buttons').append('<div class="row"><a href="#" class="up"><img src="images/up.svg" alt="up" /></a></div>').css('margin-top', '0.7em')
               .append('<div class="row" style="margin-top: 0.3em;"><a href="#" class="dn"><img src="images/down.svg" alt="down" /></a></div>');
  $('#target-form').hide();

  var temp_change_timer = null;

  $('#target-form').submit(function(event){
    var temp = parseInt($('.tmp-target').val());
    event.preventDefault();
    var $form = $(this),
        url = $form.attr("action");
    var posting = $.post(url, { target: temp, save: "Save" });
    posting.done(function(data){
      var content = $(data).find(".alert");
      $(".messages").html(content).hide().slideDown("slow", function(){
        setTimeout(function(){ $(".messages").slideUp("slow");}, 10000);
      });
    });
  });

  $('.up').click(function(){
    var temp = parseInt($('.tmp-target').val());
    if (temp < 99) temp += 1;
    $('.tmp-target').val(temp);
    $('#target.temp').text(temp);
    clearTimeout(temp_change_timer);
    temp_change_timer = setTimeout(function(){
      $('#target-form').submit();
    }, 10000);
  });

  $('.dn').click(function(){
    var temp = parseInt($('.tmp-target').val());
    if (temp > 35) temp -= 1;
    $('.tmp-target').val(temp);
    $('#target.temp').text(temp);
    clearTimeout(temp_change_timer);
    temp_change_timer = setTimeout(function(){
      $('#target-form').submit();
    }, 10000);
  });

});

function getChartData() {
  var date = new Date();
  var now = (new Date).getTime();
  var plotData = [];
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
    url: '/api/temp-data?end=' + now,
    success: function(temp_data) {
      plotData.push(temp_data);
      $.ajax({
        url: '/api/target-data?end=' + now,
        success: function(target_data) {
          plotData.unshift(target_data);
          $.plot($("#placeholder"), plotData, {
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
  });
}
