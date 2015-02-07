var io = require('socket.io')();
var Immutable = require('immutable');
var moment = require('moment');


io.on('connection', function(socket){});
io.listen(3003);

var clients = Immutable.Map();

var messages = Immutable.List([
    {
        'postDate': '11:00',
        'nick': 'Tenhunen',
        'message': 'Turvaamistoimi!!!',
        'thread': 'thread1'
    }
]);

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

        message.postDate = moment().format('hh:mm')

        messages = messages.push(message);

        io.emit(
            'message',
            { message: message }
        );

    })

});
