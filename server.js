/**
 * Created by pkdo1 on 11/28/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
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
//var server = require('http').createServer(app);

var io = require('socket.io').listen(http).sockets;

//var io = require('socket.io').listen(server);

//Start chat MM

//End chat mmm
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

//app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});

/*
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/public/app/views/pages/chat.html');
});*/


server.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listen on port 3000");
    }
});
/*
http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listen on port 3000");
    }
});*/



