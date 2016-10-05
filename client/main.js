import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './main.html';

Meteor.call("getSessionId", function(err, id) {
  sessId = id;
});

installAddress = {};
finalLat = {};
userGeo = new ReactiveVar(null);

//***** Where Submit button was originally ******//
Template.getAddressForm.events({
  'submit form': function(event){
    event.preventDefault();
    var installAddress = event.target.installAddress.value;
    addrString = JSON.stringify(installAddress);
    var options = {
    url: 'http://54.167.129.81/street2coordinates',
    method: 'POST',
    //headers: 'Content-Type: application/json',
    data: installAddress
    };
    
     Meteor.call('plotMap', options, function(err, resp){
      if (err) {
         console.log(err);
      }else{
        Session.set('finalLat', ((resp)[installAddress].latitude));
        Session.set('finalLon', ((resp)[installAddress].longitude));
      }
    });

  }
});

Template.plot_map.helpers({
  mapPin: function(){
  return Session.get('finalLat');
  }
});

Template.map.helpers({
  
})

 /*   if(!Session.get()) {
    lat = Session.get('finalLat');
    lon = Session.get('finalLon');

    var markerLocation = new L.LatLng(lat, lon);
    var marker = new L.marker(markerLocation);
    map.addLayer(marker);
    } */

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
 
    var map = L.map('map', {
    doubleClickZoom: false
  }).setView([39.8283572, -98.5764116], 5);
  
//    var centerPoint = [40.1668141, -76.8388169];  // Set center point of map
//    var mileTometer = 1609.34;    // Used for radius of circles to convert meters to miles
    
/*    var redMarker = L.AwesomeMarkers.icon({
      icon: 'flag',
      prefix: 'ion',
      markerColor: 'red'
    });
  
    var orangeMarker = L.AwesomeMarkers.icon({
      markerColor: 'orange'
    });
  //  Polygon styling 
    var style92 = {
      "color": "red",
      "opacity": 5
    };
*/

  /** Add map tiles  **/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{mapID}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org"/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      mapID: 'i601254.15mj5o41',
      accessToken: 'pk.eyJ1IjoiaTYwMTI1NCIsImEiOiJjaXMyN2FvN3AwMDJmMnpsa3d6dGh4MXZqIn0.3ZFXal84sFTUTOziIXO9NA'
    }).addTo(map);
  /** End of Map Tiles **/
  
  /** Plot polygons **/
  //  L.geoJson(geojsonCoordinates, {
   //   style: style92
   //   }).addTo(map);
  
  // Draw circle around center point with 5 mile radius
/*    L.circle(centerPoint, (5*mileTometer), {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2
    }).addTo(map);
  
  // Draw circle around center point with 10 mile radius
    L.circle(centerPoint, (10*mileTometer), {
      color: 'blue',
      fillColor: '',
      fillOpacity: 0.0
    }).addTo(map);
  
  // Draw circle around center point with 20 mile radiu
    L.circle(centerPoint, (20*mileTometer), {
      color: 'orange',
      fillColor: '',
      fillOpacity: 0.0
    }).addTo(map);
  */
 
     //         marker.bindPopup(popupText);
   // }
};
