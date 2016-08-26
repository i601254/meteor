import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
 
  var map = L.map('map', {
  doubleClickZoom: false
}).setView([40.1668141, -76.8388169], 10);

  var mileTometer = 1609.34;
 
  var redMarker = L.AwesomeMarkers.icon({
    icon: 'flag',
    prefix: 'ion',
    markerColor: 'red'
  });

  var blueMarker = L.AwesomeMarkers.icon({
    markerColor: 'orange'
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{mapID}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org"/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mapID: 'i601254.15mj5o41',
    accessToken: 'pk.eyJ1IjoiaTYwMTI1NCIsImEiOiJjaXMyN2FvN3AwMDJmMnpsa3d6dGh4MXZqIn0.3ZFXal84sFTUTOziIXO9NA'
  }).addTo(map);
 
  L.marker([40.1668141, -76.8388169], {icon: redMarker} ).addTo(map);	// Installation location also used as center point of map

// Draw circle around center point with 5 mile radius
  L.circle([40.1668141, -76.8388169], (5*mileTometer), {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2
  }).addTo(map);

// Draw circle around center point with 10 mile radius
  L.circle([40.1668141, -76.8388169], (10*mileTometer), {
    color: 'blue',
    fillColor: '',
    fillOpacity: 0.0
  }).addTo(map);

// Draw circle around center point with 20 mile radiu
  L.circle([40.1668141, -76.8388169], (20*mileTometer), {
    color: 'orange',
    fillColor: '',
    fillOpacity: 0.0
  }).addTo(map);

// Markers for random locations to simulate service requests
  var markers = [
    [40.152240, -76.966627, "Location 1"],
    [40.227363, -76.894572, "Location 2"],
    [40.262295, -76.825336, "Location 3"],
    [40.107615, -76.859768, "Location 4"]
  ];

  for (var i=0; i<markers.length; i++) {
           
            var lat = markers[i][0];
            var lon = markers[i][1];
            var popupText = markers[i][2];

            var markerLocation = new L.LatLng(lat, lon);
            var marker = new L.marker(markerLocation);
            map.addLayer(marker);

            marker.bindPopup(popupText);
  };
};
