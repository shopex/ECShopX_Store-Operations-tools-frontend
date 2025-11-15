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

import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import S from '@/spx'
import Entry from '@/utils/entry'
import { SpLoading } from '@/components'
import { isIos } from '@/utils'

export default class LandingIndex extends Component {
  router = getCurrentInstance()
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    Taro.setStorageSync('isWebView', true)
    ;(!isIos() && Taro.setStorageSync('wxConfigSignUrl', location.href.split('#')[0])) ||
      Taro.setStorageSync('wxConfigSignUrl', '')
    let _params = this.router.params || getCurrentInstance().router.params

    console.log('原始路径：', this.router)
    console.log('原始路径：_params', _params)

    // Entry.runHooks()
    // 处理转义字符
    // let params = {}
    // for (let _key in _params) {
    //   let key = _key.replace(/amp;/g, '')
    //   params[key] = _params[_key]
    // }

    console.log('landing willmount')
    // console.log(params)
  }

  componentDidShow() {}

  componentWillUnmount() {
    this.setState({
      loading: false
    })
  }
  render() {
    const { loading } = this.state
    return <View>{loading && <SpLoading>正在加载...</SpLoading>}</View>
  }
}
