const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8080}, () => {
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