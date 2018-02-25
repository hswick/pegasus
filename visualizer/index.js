const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const WebSocket = require('ws')
const url = require('url')

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const ws = new WebSocket.Server({server})

ws.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true)
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  ws.send(JSON.stringify({
    message: 'init',
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 5],
    color: [0, 1, 2, 3, 4]
  }))
})

server.listen(3000, () => console.log('Example app listening on port 3000!'))