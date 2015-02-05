var io = require('socket.io')();
io.on('connection', function(socket){});
io.listen(3003);

io.on('connection', function (socket) {

    socket.on('join', function(data) {

        io.emit('join', data);

    });

    socket.on('message', function(data) {

        io.emit('message', data);

    })

});
