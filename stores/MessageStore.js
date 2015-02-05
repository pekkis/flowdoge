var Fluxxor = require('fluxxor');
var Immutable = require('Immutable');

var constants = require('../constants');

var MessageStore = Fluxxor.createStore({
  
  initialize: function() {
    
    this.messages = {

      'thread2': Immutable.List([]),
      'thread1': Immutable.List([
        {
          'nick': 'Joszef_Pap',
          'message': 'Mitä hemmettiä me niille keksitään?'
        },
        {
          'nick': 'Tenhunen',
          'message': 'Turvaamistoimi!!!'
        }
      ]),
    };
    
    this.bindActions(
      constants.POST_MESSAGE, this.onPostMessage
    );
    
  },

  onLoad: function(payload) {

    console.log(data, 'DATA');
   
    this.users = Immutable.List(users);
    this.emit("change");
  },

  getMessages: function(thread) {
    return this.messages[thread];
  },

  onPostMessage: function(payload) {
    
    console.log(payload, 'payload');

    this.messages[payload.thread] = this.messages[payload.thread].push(payload.message);
    this.emit("change");
  }
  
});

module.exports = MessageStore;