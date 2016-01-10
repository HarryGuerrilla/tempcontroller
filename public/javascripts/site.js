var socket = io();
$(document).ready(function(){
  var chartOptions = {
    xaxis: {
      mode: "time",
      timezone: "browser",
      max: (new Date)
    },
    yaxis: {
      min: 55,
      max: 90,
      tickSize: 1,
      zoomRange: false
    },
    pan: {
      interactive: true
    },
    zoom: {
      interactive: true
    }
  };

  var plotData = [];
  var plot = $.plot($("#placeholder"), plotData, chartOptions);
  function updateChart() {
    plotData = [];
    function onDataReceived(series) {
      plotData.push(series);
      chartOptions = plot.getOptions();
      plot = $.plot($("#placeholder"), plotData, chartOptions);
    }
    $.ajax({
      url: "/api/temp-data",
      type: "Get",
      dataType: "json",
      data: { "end": (new Date).getTime() },
      success: onDataReceived
    });
    $.ajax({
      url: "/api/target-data",
      type: "Get",
      dataType: "json",
      data: { "end": (new Date).getTime() },
      success: onDataReceived
    });
    $.ajax({
      url: "/api/ambient-temp-data",
      type: "Get",
      dataType: "json",
      data: { "end": (new Date).getTime() },
      success: onDataReceived
    });
  }

  updateChart();

  socket.on('temp reading', function(reading){
    $('#temp').text(reading);
  });

  socket.on('update chart', function(reading){
    updateChart();
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
