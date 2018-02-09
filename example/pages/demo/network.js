/**
 * 网络请求，测试时请使用node命令启动服务端，在根目录下：node server.js
 */
import rxwx from '../../utils/RxWX.js'

/**
 * http 请求
 */
let handlerA = (res) => console.log('handler a:', res)
let handlerB = (res) => console.log('handler b:', res)
// 调用小程序API
let url = 'http://localhost:3456'
wx.request({
  url,
  success(res) {
    // 逻辑与请求的紧耦合
    handlerA(res)
    handlerB(res)
  }
})

// 调用RxWX
let req = rxwx.request({
  url
})
// 轻轻松松将业务逻辑与请求分离
req.subscribe(handlerA)
req.subscribe(handlerB)

/* 
 * 建立websocket连接
 */
url = 'ws://localhost:34567'
// 调用微信小程序API
let ws = wx.connectSocket({
  url
})
ws.onOpen(() => {
  ws.send({ data: new Date })
  ws.onMessage(msg => console.log(msg.data))
  ws.close()
  ws.onClose(msg => console.log('Websocket closed.'))
})
// 调用RxWX
rxwx.connectSocket({
  url
})
.subscribe(ws => {
  ws.onOpen(() => {
    ws.send({ data: new Date })
    ws.onMessage(msg => console.log(msg.data))
    ws.close()
    ws.onClose(msg => console.log('Websocket closed.'))
  })
})

