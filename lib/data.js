var redis = require("redis"),
    client = redis.createClient();

// args = ['batch', epoch-milliseconds, ['epoch', 'temp']];
module.exports = {
    save: function (args) {
        client.zadd(args, function (err, response){
            if (err) throw err;
            console.log('added '+response+' items');
        });
    },
    get: function (args, callback) {
        return client.zrange(args, function(err, response){
            if (err) throw err;
            callback(response);
        });
    },
  downSample: function (data, max, callback) {
    if (data.length <= max) {
      callback(data);
    } else {
      var downSampledData = [];
      var rankedPoints = rankPoints(data);
      var bucketSize = Math.ceil(data.length/(max - 2));
      var first = data.shift();
      var last = data.pop();
      var buckets = groupByBucket(rankedPoints, bucketSize);
      buckets.forEach(function(bucket){
        var rank = 0;
        var greatestArea = [];
        for (var i=0; i<bucket.lenfth; i++) {
          if (bucket[i][0] > rank) {
            rank = bucket[i][0];
            greatestArea = bucket[i][1];
          }
        }
        if (rank == 0) {
          greatestArea = bucket[Math.floor(bucket.length/2)][1];
        }
        downSampledData.push(greatestArea);
      });
      downSampledData.unshift(first);
      downSampledData.push(last);
      callback(downSampledData);
    }
  },
  clear: function(key) {
    client.del(key, function (err, response) {
      if (err) throw err;
      console.log('deleted ' + key);
    });
  }
};

function rankPoints(data) {
  var rankedPoints = [];
  for (var i=0; i < data.length; i++) {
    if (i == 0) {
      rankedPoints.push([0, data[i]]);
    } else if (i == data.length - 1) {
      rankedPoints.push([0, data[i]]);
    } else {
      var area = Math.abs(calcArea(data[i-1], data[i], data[i+1]));
      rankedPoints.push([area, data[i]]);
    }
  }
  return rankedPoints;
}

function groupByBucket(data, bucketSize) {
  var newArray = [];
  var subArray = [];
  for (var i=0; i<data.length; i++) {
    if (i==data.length-1) { // if last item in data end bucket
      subArray.push(data[i]);
      newArray.push(subArray);
    } else if (i%bucketSize == 0 && i != 0) {
      newArray.push(subArray);
      subArray = [];
      subArray.push(data[i]);
    } else {
      subArray.push(data[i]);
    }
  }
  return newArray;
}

function calcArea(p1, p2, p3) {
  var area = 0;
  area = ((p1[0]*(p2[1]-p3[1])) +
          (p2[0]*(p3[1]-p1[1])) +
          (p3[0]*(p1[1]-p2[1])))/2;
  return area;
}
