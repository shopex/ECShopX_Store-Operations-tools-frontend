import req from './req'

export function getAuthorizeUrl(params) {
  return req.get('/operator/workwechat/authorizeurl', params)
}

export function workwechatOauthLogin(params) {
  return req.post('/operator/workwechat/oauth/login', params)
}

export function bindMobile(params) {
  return req.post('/operator/workwechat/bind_mobile', params)
}
