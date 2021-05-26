import req from './req'

export function getProtocol (params) {
  return req.get('/api/protocol', params)
}

export function sendCode( params ) {
  return req.get('/api/app/sms/code', params)
}

export function smsLogin( params ) {
  return req.get('/api/sms/login', params)
}