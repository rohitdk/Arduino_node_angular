# Arduino_node_angular
Hello world(Blink LED) example in electronic world with Node,Angularjs <br>
Controlling LED without ESP8266 wifi module.
## Installation - 
### 1) Install Node
### 2) Install npm with required packages
## Steps which are need to follow - 
### 1) Arduino setup - 
- Update standard firmata from Arduino IDE or use command prompt to update arduino firamata
- After updating firmata run the same code on arduino board (If it won't work, try some other ways to update firmata on arduino board)
### 2) Angular setup - 
- Install angular.js, socket.io.js library or directly use CDN (Socket.io.js file won't work in my code so I used CDN).
### 3) Node setup - 
- Install http, express, johny-five, socket-io modules
- Johnny-Five: 
  Johnny-Five is the JavaScript Robotics & IoT Platform.
  It basically integrate javascript with arduino-board, cool, isn't it?
- Command to install all required module - npm install your_module_name 
### 4) Include all module in server.js
```
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);
  ```
 ### 5) Set port number
 ```
 var port = 3000; 
 ```
 ### 6)Load index.html on listning port
 ```
 app.use(express.static(__dirname ));

app.get('/', function(req, res) {  
		console.log(__dirname);
        res.sendFile(__dirname + '/index.html');
		
});

httpServer.listen(port);  
console.log('Server available at http://localhost:' + port); 
```
### 7)Make arduino board-connection
```
var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led(13);
});
```
### 8)Socket connection handler to handle events/functions on button click 
```
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
```
## That's it!! Check your led is blinking :)
