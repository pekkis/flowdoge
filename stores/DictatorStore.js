var Fluxxor = require('fluxxor');
var Immutable = require('immutable');

var constants = require('../constants');

var DictatorStore = Fluxxor.createStore({
  
  initialize: function() {
    
    this.dictators = Immutable.List([]);

    this.bindActions(
      constants.LOAD_DICTATORS, this.onLoad
    );
  },

  onLoad: function(data) {

    console.log(data, 'DATA');
   
    this.dictators = Immutable.List(data.dictators);
    this.emit("change");
  },

  getState: function() {
    return {
      dictators: this.dictators
    };
  }
});

module.exports = DictatorStore;
