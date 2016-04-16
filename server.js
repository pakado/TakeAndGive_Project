/**
 * Created by pkdo1 on 11/28/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
<<<<<<< HEAD
var http = require("http");
var chatServer = require("./app/models/chat_server.js");

var app = express();

//chat
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
app.use(favicon(path.join(__dirname, './public/favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



var server = http.Server(app);
chatServer.listen(server);
//var http = require('http').Server(app);
=======
var app = express();

var http = require('http').Server(app);
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
//var server = require('http').createServer(app);

var io = require('socket.io').listen(http).sockets;
//var io = require('socket.io').listen(server);
<<<<<<< HEAD
/*
=======

>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
mongoose.connect(config.database, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('Connected to the database')
    }
    users = [];
    function splitAnnotatedMessage(msg) {
        var annotatedUser = '',
            message = msg.msg,
            words = message.split(" "),
            length = 0;
        // if user is annotated in the first word... like @manoj
        if (words[0].indexOf('@') > -1) {
            var splitWord = words[0].split("@");
            annotatedUser = splitWord[1];
            length = words[0].length;

            words.shift(); // removes the first element which is the annotated username
        }

        msg.msg = words.join(" ");
        return {annotatedUser: annotatedUser, message: msg};
    }

    io.on('connection', function (socket) {
        var db=mongoose.connection;
        console.log('userData.username is connected');
        socket.on('disconnect',function(){
            console.log('is disconnected');
        });
        var col = db.collection('messages'),
            sendStatus=function(s){
                socket.emit('status',s);
            };


        //emit all messages
        socket.on('join', function(data) {
            var msg = JSON.parse(data);
            var uniqueUser = true;
            for (var i=0,len=users.length; i<len; i++) {
                if (users[i] === msg.user) {
                    uniqueUser = false;
                }
            }

            if (uniqueUser) {
                socket.username = msg.user;
                users.push({user: msg.user, socketId: socket.id});
                var reply = JSON.stringify({action: 'control', user: msg.user, msg: ' joined the channel' });
                //socket.emit('chat', reply);
                io.emit('chat', reply);
                io.emit('onlineUsers', JSON.stringify(users));
            }
        });

        // Leaving Chat Room
        socket.on('disconnect', function(){
            for(var i = 0; i < users.length; i++) {
                if(users[i].user == socket.username) {
                    users.splice(i, 1);
                }
            }

            var reply = JSON.stringify({action: 'control', user: socket.username, msg: ' left the channel' });
            //socket.emit('chat', reply);
            io.emit('chat', reply);
            io.emit('onlineUsers', JSON.stringify(users));
        });

        // Chatting in the Room
        socket.on('chat', function (data) {
            var obj = splitAnnotatedMessage(JSON.parse(data)),
                sendSelf = false, // defaults to broadcasting mode or group chat
                annotatedUser = obj.annotatedUser,
                msg = obj.message,
                reply, message;

            if (msg.msg === "") {
                msg.msg = "שלום לכולם!!";
            }
            else if (msg.msg === "מי אני") { // find me - an option for self messaging
                msg.msg = " השם שלך בצט הוא:" + msg.user;
                sendSelf = true;
            }
            else if (msg.msg === "ALL_USERS") {
                console.log("All Users - " + JSON.stringify(users));
            }

            var targetSocketId = '';
            for (var i=0, len=users.length; i<len; i++) {
                if (users[i].user === annotatedUser) {
                    targetSocketId = users[i].socketId;
                    sendSelf = true;
                    break;
                }
            }

            if (targetSocketId === '') {
                reply = JSON.stringify({action: 'message', user: msg.user, msg: msg.msg});
                socket.emit('chat', reply);
                if (!sendSelf) socket.broadcast.emit('chat', reply); // broadcasting the message
            }
            else {
                // Format how the private message should be shown to the sender and show it to Sender
                // No other users in the group sees this private message
                message = 'שולח הודעה פרטית ל' + annotatedUser + ':' + msg.msg;
                reply = JSON.stringify({action: 'message', user: msg.user, msg: message});
                socket.emit('chat', reply);
                io.to(targetSocketId).emit('chat', reply);
            }
        });
        col.find().limit(100).sort({_id: 1}).toArray(function(err,res){
            if (err) throw err;
            socket.emit('output',res);
        });
        socket.on('input', function (data) {
            var name = data.name,
                message = data.message,
                whitespacePattern=/^\s*$/;
            if(whitespacePattern.test(name)|| whitespacePattern.test(message)){
                sendStatus('Name and message is required');
            }
            else {

                col.insert({name: name, message: message}, function () {

                    //emit lasted message to all client
                    io.emit('output',[data]);

                });
            }
        });

    });
});
<<<<<<< HEAD
*/
=======

>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

<<<<<<< HEAD
//app.use(express.static(__dirname + '/public'));


=======
app.use(express.static(__dirname + '/public'));
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/public/app/views/pages/chat.html');
});

<<<<<<< HEAD

=======
/*
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
server.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listen on port 3000");
    }
<<<<<<< HEAD
});
/*
=======
});*/
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084
http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listen on port 3000");
    }
<<<<<<< HEAD
});*/
=======
});
>>>>>>> 09d563681296f357a04692475eb9c24f67d35084



