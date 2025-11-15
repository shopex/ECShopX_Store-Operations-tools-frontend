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

import req from './req'
import { isFromWebapp } from '@/utils'

export function getAuthorizeUrl(params) {
  return req.get('/operator/workwechat/authorizeurl', params)
}

export function workwechatOauthLogin(params) {
  return req.post('/operator/workwechat/oauth/login', params)
}

export function bindMobile(params) {
  return req.post('/operator/workwechat/bind_mobile', params)
}

export function getQwJsSdkConfig(params) {
  if (isFromWebapp()) {
    return req.post('/operator/wechat/distributor/js/config', params)
  } else {
    return req.post('/workwechat/distributor/js/config', params)
  }
}
//获取图片验证码
export function getImageVerificationCode(params) {
  return req.get('/operator/app/image/code', params)
}
//获取手机验证码
export function getPhoneCode(params) {
  return req.post('/operator/app/sms/code', params)
}
