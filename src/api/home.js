import req from './req'

export function getStatistics() {
  return req.get('/getStatistics')
}
