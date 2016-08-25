import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
});

var options = {
  host: '54.167.129.81',
  httpAdapter: 'http',
  formatter: null
};

var geo = new GeoCoder();
var result = geo.geocode('703 16th Street, New Cumberland PA 17070');
console.log(result);
