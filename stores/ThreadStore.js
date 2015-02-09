var Fluxxor = require('fluxxor');
var Immutable = require('immutable');

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

    this.currentThread = this.threads.get(1);
    
    this.bindActions(
      constants.CHANGE_THREAD, this.changeThread
    );
    
  },

  changeThread: function(data) {

    this.currentThread = data.thread;
   
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
