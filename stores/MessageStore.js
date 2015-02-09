var Fluxxor = require('fluxxor');
var Immutable = require('immutable');

var constants = require('../constants');

var MessageStore = Fluxxor.createStore({
  
  initialize: function() {
    
    this.messages = Immutable.List();
    
    this.bindActions(
      constants.POST_MESSAGE, this.onPostMessage,
      constants.LOAD_MESSAGES, this.onLoadMessages
    );
    
  },

  getMessages: function(thread) {
    return this.messages.filter(function(message) {
      return (message.thread === thread.id);
    });
  },

  onPostMessage: function(payload) {
    this.messages = this.messages.push(payload.message);
    this.emit("change");
  },

  onLoadMessages: function(payload) {
    this.messages = Immutable.List(payload.messages);
    this.emit("change");
  }
  
});

module.exports = MessageStore;
