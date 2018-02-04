// server.js
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);

var port = 3000; 

app.use(express.static(__dirname ));

app.get('/', function(req, res) {  
		console.log(__dirname);
        res.sendFile(__dirname + '/index.html');
		
});

httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var led;

//Arduino board connection

var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led(13);
});

//Socket connection handler
io.on('connection', function (socket) {  
        console.log(socket.id);

        socket.on('led:on', function (data) {
           led.on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led:off', function (data) {
            led.off();
            console.log('LED OFF RECEIVED');

        });
    });

console.log('Waiting for connection');