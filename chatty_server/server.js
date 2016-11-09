// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function clientInfo (bool){
  let clientInfo = {
    type: 'incomingNotification',
    total: wss.clients.length,
    content: 'User has joined the channel.'
  }
  if(!bool){
    clientInfo.content = 'User has left the channel'
  }
  clientInfo = JSON.stringify(clientInfo)
  wss.clients.forEach(function each(client) {
    client.send(clientInfo);
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.length + ' users online');
  clientInfo(true);
  ws.on('message', function incoming(message) {
    let incomingMessage = JSON.parse(message);
    if(incomingMessage.type === "message"){
      let response = {id: uuid.v1(),
                      user: incomingMessage.user,
                      content: incomingMessage.text,
                      type: incomingMessage.type }
      let data = JSON.stringify(response)
      wss.clients.forEach(function each(client) {
        client.send(data);
      })
    }
    else if(incomingMessage.type === "userChange"){
      console.log(incomingMessage.old + " changed their name to: " + incomingMessage.new);
    }
    else{
      console.log("unreconized message type");
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(wss.clients.length + ' users online');
    clientInfo(false);
  });
});
