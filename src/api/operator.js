import req from './req'

export function getProtocol (params) {
  return req.get('/operator/protocol', params)
}
