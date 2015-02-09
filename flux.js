var Fluxxor = require('fluxxor');

var constants = require('./constants');
var actions = require('./actions');

var UserStore = require('./stores/UserStore');
var ThreadStore = require('./stores/ThreadStore');
var MessageStore = require('./stores/MessageStore');



var stores = {
  UserStore: new UserStore(),
  ThreadStore: new ThreadStore(),
  MessageStore: new MessageStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("change", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

module.exports = flux;