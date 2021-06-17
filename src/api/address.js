import req from './req'

export function getAddressList(params) {
  return req.get('/distributors/aftersalesaddress', params)
}

export function postAddressList(params) {
  return req.post('/distributors/aftersalesaddress', params)
}
export function updateAddressActive(params) {
  return req.put('/distributors/aftersalesaddress', params)
}

export function areaList() {
  return req.get('/espier/address')
}
