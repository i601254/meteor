import { Meteor } from 'meteor/meteor';
import { Locations } from '../imports/api/locations.js';
//import { HTTP } from 'meteor/http'

Future = Npm.require('fibers/future');

Meteor.startup(() => {
  // code to run on server at startup
});

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
//            console.log(geojsonFeature);
//            console.log(Object.keys(geojsonFeature).length);
//            return future["return"](geojsonFeature);
        }
      }
     }
    });
    return future.wait();
  }
});

