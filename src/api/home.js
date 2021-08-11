import req from './req'

export function getStatistics(params) {
  return req.get('/getStatistics', params)
}

export function checkCode(params) {
  return req.post('/discountcard/consume', params)
}
