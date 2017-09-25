import * as Rx from './Rx'
let ob = {}

for (let p in wx) {
  switch (typeof wx[p]) {
    case 'object':
      ob[p] = Object.assign(wx[p])
      break;
    case 'function':
      if (/Sync$/.test(p)) {
        ob[p] = (obj) => Rx.Observable.of(wx[p].call(null, obj))
      } else {
        ob[p] = (obj) => Rx.Observable.create(observe => {
          let param = Object.assign({}, obj)
          param.success = (...arg) => observe.next(...arg)
          param.fail = (e) => observe.error(e)
          param.complete = (res) => observe.complete()
          wx[p].call(null, param)
        })
      }
      break;
    default:
      ob[p] = wx[p]
      break;
  }
}

module.exports = ob