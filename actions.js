var constants = require('./constants');

var actions = {

    changeThread: function(thread) {

        this.dispatch(constants.CHANGE_THREAD, { 'thread': thread });    

    },

    postMessage: function(thread, message) {
        this.dispatch(constants.POST_MESSAGE, { 'thread': thread, 'message': message });            
    },

    connect: function(socket, nick) {
        this.dispatch(constants.CONNECT, { 'socket': socket, 'nick': nick });             
    },

    join: function(nick) {
        this.dispatch(constants.JOIN, {nick: nick});
    }

};

module.exports = actions;