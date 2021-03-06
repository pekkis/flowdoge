var constants = require('./constants');
var config = require('./config');

var actions = {

    user: {

        connect: function(nick) {
            
            var socket = require('socket.io-client')(config.host);
            
            socket.on('join', function(payload) {
                this.flux.actions.user.join(payload.users);
            }.bind(this));

            socket.on('message', function (payload) {
                
                

                this.flux.actions.postMessage(payload.message);
            }.bind(this));

            socket.on('messages', function (payload) {

                this.flux.actions.loadMessages(payload.messages);
            }.bind(this));


            socket.on('connect', function() {
                socket.emit('join', {nick: nick });
            });

            this.dispatch(constants.CONNECT, { 'socket': socket, 'nick': nick });             
        },

        join: function(users) {
            this.dispatch(constants.JOIN, {users: users});
        }

    },


    changeThread: function(thread) {

        this.dispatch(constants.CHANGE_THREAD, { 'thread': thread });    

    },

    postMessage: function(message) {
        
        console.log(message, 'Got message');

        this.dispatch(constants.POST_MESSAGE, { 'message': message });            
    },


    

    loadMessages: function(messages) {
        this.dispatch(constants.LOAD_MESSAGES, {messages: messages});
    }

};

module.exports = actions;