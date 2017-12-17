/**
 * 同步
 */
import rxwx from '../../utils/RxWX.js'

// 调用小程序API
try {
  let result = wx.removeStorageSync('xx')
  console.log(result)
} catch (e) {
  console.error('小程序API发现错误')
}
// 调用RxWX
rxwx.removeStorageSync('xx')
  .catch((e) => console.error('RxWX发现错误'))
  .subscribe((resp) => console.log(resp))

/**
 * 异步
 */
// 调用小程序API
wx.removeStorage({
  key: 'xx',
  success: function (res) {
    console.log(res)
  },
  error: function (e) {
    console.error('小程序API发现错误')
  }
})
// 调用RxWX
rxwx.removeStorage({ key: 'xx' })
  .catch((e) => console.error('RxWX发现错误'))
  .subscribe((resp) => console.log(resp))