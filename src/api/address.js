import req from './req'

export function getAddressList(params) {
  return req.get('/distributors/aftersalesaddress', params)
}

export function areaList() {
  return req.get('/espier/address')
}
