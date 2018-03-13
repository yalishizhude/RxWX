import * as Rx from './Rx'

const cbObj2Obs = (obj, fn, returnMethod) => Rx.Observable.create(observe => {
  if(typeof obj==='object' || typeof obj==='undefined') {
    let param = Object.assign({}, obj)
    let pro = new Promise((resolve, reject) => {
      param.success = (...arg) => {
        resolve(...arg)
      }
      param.fail = (e) => reject(e)
    })
    let instance = fn.call(null, param) || {}
    pro.then(res => {
      observe.next(Object.assign(instance, res))
      observe.complete()
    }, e => {
      observe.error(e, instance)
      observe.complete()
    })
  } else {
    observe.next(fn.call(null, obj))
  }
})

let ob = {
  Rx: {}
}

for (let p in Rx) {
  ob.Rx[p] = Rx[p]
}

for (let p in wx) {
  switch (typeof wx[p]) {
    case 'object':
      ob[p] = Object.assign(wx[p])
      break;
    case 'function':
      if (/Sync$/.test(p)) {
        ob[p] = (...arg) => Rx.Observable.of(wx[p].call(null, ...arg))
      } else {
        ob[p] = (obj) => cbObj2Obs(obj, wx[p])
      }
      break;
    default:
      ob[p] = wx[p]
      break;
  }
}

module.exports = ob