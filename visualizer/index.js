const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const WebSocket = require('ws')
const url = require('url')
const jayson = require('jayson')

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const ws = new WebSocket.Server({server})

let real_socket

ws.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true)
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  real_socket = ws
})

// create a server
const rpcServer = jayson.server({
  test: (data, cb) => {
    cb(null, { ok: true})
  },
  message: (data, cb) => {
    real_socket.send(JSON.stringify(data))
    cb(null, { ok: true })
  }
})

rpcServer.http().listen(3001)


server.listen(3000, () => console.log('Pegasus Visualizer listening on port 3000!'))