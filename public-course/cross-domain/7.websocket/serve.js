// const express = require('express')
// const app = express()
const Websocket = require('ws')

const wss = new Websocket.Server({ port: 5000 })

wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(data)
    ws.send('llllll')
  })
})
