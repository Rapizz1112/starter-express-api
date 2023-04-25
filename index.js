
'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws')


const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server }, () => {
    console.log('server started');
})

wss.on('connection', (ws) => {
    ws.send("Connect")
    ws.on('message',(data)=> {
        const dataString = String(data);
        console.log('data received \n' + data)     
        switch(dataString)
        {
            case 'Hello':
                {
                    ws.send("Hello too")
                    break;
                }
            case 'Hello2':
                {
                    ws.send("Hello2 too")
                    break;
                }
            default :
            {
                ws.send("error")
                break;
            }
        }
    })
})

wss.on('listening', () => {
    console.log('server is listening on port 8080')
})
server.listen(8080, function () {
    console.log('Listening on http://0.0.0.0:8080');
  });
function broadcastUpdate () {
    wss.clients.forEach(function each (client) {
      // filter disconnected clients
      if (client.readyState !== WebSocket.OPEN) return
      // filter out current player by client.udid
      var otherPlayers = Object.keys(players).filter(udid => udid !== client.udid)
      // create array from the rest
      var otherPlayersPositions = otherPlayers.map(udid => players[udid])
      // send it
      client.send("Hello");
    })
   
  }