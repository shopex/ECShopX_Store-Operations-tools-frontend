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

export function getProtocol(params) {
  return req.get('/api/protocol', params)
}

//发送验证码
export function sendCode(params) {
  return req.post('/operator/app/sms/code', params)
}

export function smsLogin(params) {
  return req.get('/api/sms/login', params)
}

export function getUserInfo(params) {
  return req.get('/operator/getinfo', params)
}

//绑定手机号
export function bindPhone(params) {
  return req.post('/operator/workwechat/bind_mobile', params)
}

//绑定店铺
export function selectDistributor(params) {
  return req.post('/operator/select/distributor', params)
}
