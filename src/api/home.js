import req from './req'

export function getStatistics(params) {
  return req.get('/getStatistics', params)
}

export function checkCode(params) {
  return req.post('/discountcard/consume', params)
  // return req.post('http://ecshopx.s.ex-sandbox.com/api/discountcard/consume', params)
}
