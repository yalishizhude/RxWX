import * as Rx from './Rx'

const fromPromise = Rx.Observable.fromPromise
const cbObj2Obs = (obj, fn, returnMethod) => {
  let param = Object.assign({}, obj)
  return fromPromise(new Promise((resolve, reject) => {
    param.success = (...arg) => {
      resolve(...arg)
    }
    param.fail = (e) => reject(e)

    fn.call(null, param)
  }));
}

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
        ob[p] = (obj) => Rx.Observable.of(wx[p].call(null, obj))
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