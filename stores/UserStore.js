var Fluxxor = require('fluxxor');
var Immutable = require('immutable');

var constants = require('../constants');

var UserStore = Fluxxor.createStore({
  
  initialize: function() {
    
    this.users = Immutable.List([
      {
        'nick': 'Joszef_Pap',
      },
      {
        'nick': 'Tenhunen'
      }
    ]);

    this.socket = null;

    this.nick = null;

    
    this.bindActions(
      constants.CONNECT, this.onConnect,
      constants.JOIN, this.onJoin
    );

  },

  onConnect: function(payload) {
    this.socket = payload.socket;
    this.nick = payload.nick;
    this.emit("change");

    return true;
  },

  onJoin: function(payload) {

    console.log(payload, 'JOIN payload');

    this.users = Immutable.List(payload.users);
    this.emit('change');
  },

  getUsers: function() {
    return this.users;
  },

  getSocket: function() {
    return this.socket;
  },

  getNick: function() {
    return this.nick;
  }
  
});

module.exports = UserStore;
