import req from './req'

export function getStatistics(params) {
  return req.get('/getStatistics', params)
}
