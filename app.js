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

    socket.on('createMessage', (message)=>{
        console.log(message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect',()=>{
        console.log('user was disconnected')
    });
});





server.listen(port, ()=>{
    console.log(`server is running on port:${port}`);
});

module.exports = app;
