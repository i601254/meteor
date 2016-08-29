import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

// Geocoder Options using DSTK AWS server
//var options = {
//  host: '54.167.129.81',
//  httpAdapter: 'http',
//  formatter: null
//};

// Called when submit button clicked. Sends address entered to Geocoder
//Meteor.methods({
//  'plotMap': function(){
//    HTTP.call('POST', 'http://54.167.129.81/street2coordinates',{data:'["703 16th Street, New Cumberland PA 17070","542 Industrial Drive, Lewisberry PA 17339"]'}, function(err,resp) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log(resp.content);
   // var geo = new GeoCoder();
   // var result = geo.geocode(installAddress);
//      return resp;
//      }
//    })
//  }
//});

var addresses = [
  "703 16th Street, New Cumberland PA 17070",
  "542 Industrial Drive, Lewisberry PA 17339",
  "1113 Musket Lane, Mechanicsburg PA 17055"
];

var curl = require('curlrequest');
var options = {
  url: 'http://54.167.129.81/street2coordinates',
  method: 'POST',
  headers: 'Content-Type: application/json'
//  data: '["703 16th Street, New Cumberland PA 17070","542 Industrial Drive, Lewisberry PA 17339","1113 Musket Lane, Mechanicsburg PA 17055"]'
 };
var request = curl.request(options);
request(options,{data:'["703 16th Street, New Cumberland PA 17070"]'}, function(err,resp) {
  if (err) {
    console.log(err);
  } else {
    console.log(resp);
  }
});
