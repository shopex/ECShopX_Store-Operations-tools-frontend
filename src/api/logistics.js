import req from './req'

//获取物流信息
export function getLogistics(params) {
  console.log(params)
  return req.get('/delivery/process/list', params)
}

// 获取快递公司
export function getCourierCompanyList() {
  return req.get('/trade/logistics/list')
}

// 修改物流信息
export function uodateLogistics(orders_delivery_id, data) {
  return req.put(`/delivery/${orders_delivery_id}`, data)
}
