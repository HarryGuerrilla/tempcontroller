var sqlite3 = require('sqlite3').verbose(),
    fs = require('fs'),
    file = './data.db',
    exists = fs.existsSync(file),
    db = new sqlite3.Database(file);


module.exports = {
// args = ['batch', epoch-milliseconds, temp];
  setup: function(callback) {
    db.serialize(function(){
      if (!exists) {
        var stmt = "CREATE TABLE temps (batch TEXT, time INTEGER, temperature FLOAT)";
        console.log(stmt);
        db.run(stmt, function(err){
          if(err){console.log(err);}
          callback();
        });
      }
    });
  },
  save: function (args) {
    db.run("BEGIN TRANSACTION", function(err) {
    });
    var stmt = "INSERT INTO temps (batch, time, temperature) VALUES (?, ?, ?)";
    console.log(stmt.replace(/\?/g,"%s"), args[0], args[1], args[2]);
    db.run(stmt, [args[0],args[1],args[2]], function(err){
        if(err){console.log(err);}
      });
    db.run("END;", function(err){
    });
  },
// args = ['batch', startime, endtime]
  get: function (args, callback) {
    if(args[2] == -1) {
      args[2] = Date.parse(new Date());
    }
    var stmt = "SELECT * FROM temps WHERE batch = \"" + args[0] + "\" AND (time BETWEEN " + args[1] + " AND " + args[2] + ")";
    console.log(stmt);
    db.all(stmt, function(err, data){
      if (err){ console.log(err);}
      callback(data);
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
        for (var i=0; i<bucket.length; i++) {
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
  clear: function(batch) {
    db.run("DELETE FROM temps WHERE batch=\"" + batch + "\"", function(err){
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

function deleteOlderThan(time) {
  client.zremrangebyscore(['batch', '-inf', '(' + time], function(){
  });
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

//db.close();
