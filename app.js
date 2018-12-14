const express = require('express');
const path = require('path');
const http= require('http');
const logger = require('morgan');
const socketIO = require('socket.io');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.use('/', indexRouter);
app.use('/users', usersRouter);


io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Miraje',
        text: 'Hey, its works',
        createdAt: 23232
    });

    socket.on('createMessage', (message)=>{
        console.log(message)
    });

    socket.on('disconnect',()=>{
        console.log('user was disconnected')
    });
});





server.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
});

module.exports = app;
