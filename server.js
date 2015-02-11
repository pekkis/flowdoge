var io = require('socket.io')();
var Immutable = require('immutable');
var moment = require('moment');
var slug = require('slug');
var mongoose = require('mongoose');
var clone = require('clone');

var config = require('./config');

mongoose.connect(config.mongo);
io.listen(3003);

var Message = mongoose.model(
    'Message',
    {
        thread: String,
        nick: String,
        message: String,
        postDate: Date
    }
);

var Thread = mongoose.model(
    'Thread',
    {
        id: String,
        name: String
    }
);




Message.find({}).sort({"postDate": 1}).lean().exec(function(err, messages) {
    if (err) {
        return console.error(err);
    }

    var clients = Immutable.Map();

    var messages = Immutable.List(messages).map(function(message) {
        message.postDate = moment(message.postDate).format('YYYY-MM-DD HH:mm:ss');

        return message;
    });

    var emitUsers = function() {
        
        var activeUsers = clients.toList();

        console.log(activeUsers.toArray(), 'active users');

        io.emit(
            'join',
            {
                users: activeUsers.toArray()
            }
        );

    };

    var emitMessages = function(socket) {
        
        console.log(messages.toArray(), 'posting initial messages');

        socket.emit('messages', { messages: messages.toArray()});
    };


    io.on('connection', function (socket) {

        clients = clients.set(socket, {});

        socket.on('join', function(data) {

            console.log(data, 'data');
            clients = clients.set(socket, {nick: data.nick});

            emitUsers();
            emitMessages(socket);

        });

        socket.on('disconnect', function() {
            
            console.log('disconnect');

            clients = clients.delete(socket);
            emitUsers();
        });

        socket.on('message', function(message) {

            console.log(message, 'message');

            message.postDate = moment();

            var mongoMessage = new Message(message);
            mongoMessage.save(function (err) {
              if (err) {
                console.log(err);
              }
                
            });

            message.postDate = message.postDate.format('YYYY-MM-DD HH:mm:ss')
     
            messages = messages.push(message);

            io.emit(
                'message',
                { message: message }
            );

        });

    });

  
});



