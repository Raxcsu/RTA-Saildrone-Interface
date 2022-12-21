/* ---------- INITIALIZE SERVER ---------- */
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){console.log('new device');});

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));

/* ---------- INITIALIZE SERIALPORT ---------- */
const SerialPort = require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');

const port = new SerialPort({
    path: 'COM11',
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    flowControl: false,
});

const parser = port.pipe(new DelimiterParser({ delimiter: '\r\n'}))

/* ---------- ARDUINO DATA ---------- */

parser.on('open', function(data){
    console.log('Connection is opened');
});

parser.on('data', function(data){
    //var enc = new TextDecoder();
    //var arr = new Uint8Array(data);
    //ready = enc.decode(arr)
    //console.log(ready);
    let counter = parseInt(data, 10);
    console.log(counter);
    io.emit('counter', data.toString());
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));