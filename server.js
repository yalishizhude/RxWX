/*
 * http server
 */
const http = require('http')

const httpServer = http.createServer((req, res) => {
  res.on('data', res => console.log('http server received:' + res))
  res.end('http server@' + new Date().toString())
})
httpServer.listen(3456)

/*
 * websocket server
 */
const WebSocket = require('ws')

const wsServer = new WebSocket.Server({
  port: 34567
})

wsServer.on('connection', ws => {
  ws.on('message', msg => {
    console.log('received:' + msg)
    ws.send('received:' + msg)
  })
  console.log('ws client connected...')
  ws.send('welcome~')
})

console.log('http server listen on 3456...\nwebsocket server listen on 34567...')