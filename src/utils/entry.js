// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import { requestCallback, qwsdk, isIos } from '@/utils'

const EntryPool = {
  //[MKT-1508] 导购小程序进入
  'MKT-1508': async function () {
    // 记录是webView访问;
    Taro.setStorageSync('isWebView', true)
  }
}
class Entry {
  static getEntry() {
    if (window.__Entry) return window.__Entry
    else {
      window.__Entry = new Entry()
    }
    return window.__Entry
  }
  constructor() {}
  init(taro, store) {
    this.__taro = taro
    this.__store = store
  }
  set(key, val) {
    this.EntryData[key] = val
  }
  get(key) {
    return this.EntryData[key]
  }
  runHooks(entryCode) {
    return EntryPool[entryCode].call(this)
  }
}
export default Entry.getEntry()
