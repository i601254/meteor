import { Meteor } from 'meteor/meteor';
import { Locations } from '../imports/api/locations.js';
//import { HTTP } from 'meteor/http'

Future = Npm.require('fibers/future');

Meteor.startup(() => {
  // code to run on server at startup
});

tj = Npm.require('togeojson');
fs = Npm.require('fs');
    // node doesn't have xml parsing or a dom. use jsdom
jsdom = Npm.require('jsdom').jsdom;

var geodata = Assets.getText('office_locations_tracks_ogrgeojson.geojson');
var gpx = jsdom(fs.readFileSync(geodata));

//var geojsonFeature = tj.gpx(gpx);
//console.log(geojsonFeature);

console.log(geodata);

var curl = require('curlrequest');

Meteor.methods({
  'getSessionId': function(){
    return this.connection.id;
  }
});

Meteor.methods({
  'plotMap': function(options){ 
     var future = new Future();
     var urlRequest = Meteor.wrapAsync(curl.request(options));
  //  var geodata = Assets.getText('office_locations.gpx');
  //  var gpx = jsdom(fs.readFileSync(geodata));
  //  var geojsonFeature = tj.kml(gpx);

       urlRequest(function(err,resp) {
         if (err) {
           console.log(err);
         }else{
           var a = JSON.parse(resp);

      let geojsonFeature = {};
      for (var property in a){
        if (a.hasOwnProperty(property)) {
          geojsonFeature = {
            "type": "Feature",
            "properties": {
              "name": property,
              "fips_county": a[property].fips_county,
              "popupContent": property
            },
            "geometry": {
              "type": "Point",
              "coordinates": [ a[property].longitude, a[property].latitude ]
            }
        };
           Locations.insert(geojsonFeature);
////            console.log(geojsonFeature);
////            Meteor.publish('jobs', function(){
////              return Locations.find();
////            });
////            console.log(Object.keys(geojsonFeature).length);
////            return future["return"](geojsonFeature);
        }
      }
     }  //close 'else'
    });  //close 'urlRequest(function)'
    return future.wait();
    Meteor.publish('jobs', function(){
      return Locations.find();
    });
  }
});

