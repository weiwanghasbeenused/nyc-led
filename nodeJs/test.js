var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var protobuf = require("protobufjs");
var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=8c2ad66b5bead80ec930bffc0e8be5dc',
  encoding: null
};
request(requestSettings, function (error, response, body) {
  console.log("request");
  if (!error && response.statusCode == 200) {
    console.log("no error");
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    feed.entity.forEach(function(ett) {
      console.log(ett);
      if (ett.trip_update) {
        console.log(ett.trip_update);
      }
    });
  }else if(error){
    console.log(error);
  }
});

// console.log("hihi");

// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);