import { Meteor } from 'meteor/meteor';
//import { Locations } from '../imports/api/locations.js';
//import { Zones } from '../imports/api/locations.js';

Zones = new Mongo.Collection('zones');

Future = Npm.require('fibers/future');

Meteor.startup(() => {
  geoBoundaries = Zones.find();
  console.log(geoBoundaries);
});

Meteor.methods({
  'getSessionId': function(){
    return this.connection.id;
  }
});

var curl = require('curlrequest');

Meteor.methods({
  'plotMap': function(options){
    var future = new Future();    
    var urlRequest = Meteor.wrapAsync(curl.request(options));
    
    urlRequest(function(err,resp) {
      if (err) {
        console.log(err);
      }else{
      var a = JSON.parse(resp);
      //console.log(resp);
      future["return"](a);
      }
    });
      return future.wait();
  }
});

  //  var future = new Future();
  //  var urlRequest = Meteor.wrapAsync(curl.request(options));
  //  var geodata = Assets.getText('office_locations.gpx');
  //  var gpx = jsdom(fs.readFileSync(geodata));
  //  var geojsonFeature = tj.kml(gpx);
  
//      zones = Zones.find( { "properties.name" : "TKIII8"});
//      console.log(zones);
//      return future["return"](zones);


 
//      var geodata = Assets.getText('office_locations_tracks_ogrgeojson.geojson');
//      var gpx = Meteor.wrapAsync(jsdom(fs.readFileSync(geodata)));

//       urlRequest(function(err,resp) {
//         if (err) {
 //          console.log(err);
//         }else{
//           var a = JSON.parse(resp);

//      let geojsonFeature = {};
//      for (var property in a){
//       if (a.hasOwnProperty(property)) {
//          geojsonFeature = {
//            "type": "Feature",
//            "properties": {
//              "name": property,
//              "fips_county": a[property].fips_county,
//              "popupContent": property
//            },
//            "geometry": {
//              "type": "Point",
//              "coordinates": [ a[property].longitude, a[property].latitude ]
//            }
//        };
//           Locations.insert(geojsonFeature);
////            console.log(geojsonFeature);
////            Meteor.publish('jobs', function(){
////              return Locations.find();
////            });
////            console.log(Object.keys(geojsonFeature).length);
//            return future["return"](gpx);
//        }
//      }
//     }  //close 'else'
//    });  //close 'urlRequest(function)'
//    return future.wait();
//    Meteor.publish('jobs', function(){
//      return Locations.find();
//    });
//  }
//});

