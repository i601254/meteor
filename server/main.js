import { Meteor } from 'meteor/meteor';
import '../imports/api/locations.js';
import { HTTP } from 'meteor/http'

Future = Npm.require('fibers/future');

Meteor.startup(() => {
  // code to run on server at startup
});

var curl = require('curlrequest');

Meteor.methods({
  'plotMap': function(options){ 
     var future = new Future();
     var urlRequest = curl.request(options);
      urlRequest(function(err,resp) {
         if (err) {
            console.log(err);
         }else{
//          var response = JSON.parse(resp);
            return future["return"](resp);
            
//            console.log((resp).data);
         }
      });
      return future.wait();
  }
});

