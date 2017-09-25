# RxWX
让微信小程序支持[RxJS](http://cn.rx.js.org/manual/overview.html)，并基于[RxJS](http://cn.rx.js.org/manual/overview.html)重新封装微信小程序API。

# 安装

1. 下载

使用github

`git clone https://github.com/yalishizhude/RxWX.git`

使用npm

`npm i rxjs-wx`

2. 拷贝根目录下的Rx.js和RxWX.js到项目目录

3. 引用文件

`import obs from 'RxWX.js'`

# 使用

## 使用Rx.js

```
// 目录结构
- pages
- app.js
- Rx.js
- RxWX.js

// app/js

import obs from 'RxWX.js'

//获取系统信息
obs.getSystemInfoSync()
    .subscribe(x => console.log(x))

```

## 使用RxWX.js

```
// 目录结构
- pages
- app.js
- Rx.js
- RxWX.js

// app/js

import * as Rx from 'Rx.js'

//获取系统信息
Rx.Observable.of(1)
    .subscribe(x => console.log(x))  // 1

```

# 更多

[RxJS](https://github.com/Reactive-Extensions/RxJS)
[微信小程序API](https://mp.weixin.qq.com/debug/wxadoc/dev/api