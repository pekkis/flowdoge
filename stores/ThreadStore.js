var Fluxxor = require('fluxxor');
var Immutable = require('Immutable');

var constants = require('../constants');

var ThreadStore = Fluxxor.createStore({
  
  initialize: function() {
    
    this.threads = Immutable.List([
      {
        'id': 'thread1',
        'name': 'Tenhustelu',
      },
      {
        'id': 'thread2',
        'name': 'Onanointi'
      }
    ]);

    this.currentThread = 'thread2';
    
    this.bindActions(
      constants.CHANGE_THREAD, this.changeThread
    );
    
  },

  changeThread: function(data) {

    console.log(data, 'DATA');

    this.currentThread = data.thread.id;
   
    this.emit("change");
  },

  getThreads: function() {
    return this.threads;
  },

  getCurrentThread: function() {
    return this.currentThread;
  }
  
});

module.exports = ThreadStore;