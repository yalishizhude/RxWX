import * as Rx from './Rx'
let ob = {}

for (let p in wx) {
  switch (typeof wx[p]) {
    case 'object':
      ob[p] = Object.assign(wx[p])
      break;
    case 'function':
      if (p.includes('Sync')) {
        ob[p] = (obj) => Rx.Observable.of(wx[p].call(null, obj))
      } else {
        ob[p] = (obj) => {
          let param = Object.assign(obj || {})
          return Rx.Observable.create(observe => {
            param.success = (arg) => {
              observe.next(arg)
              observe.complete()
            }
            param.fail = (e) => {
              console.error(e)
              observe.throw(e)
            }
            param.complete = (res) => {
              observe.next(res)
              observe.complete()
            }
            wx[p].call(null, param)
          })
        }
      }
      break;
    default:
      ob[p] = wx[p]
      break;
  }
}

module.exports = ob