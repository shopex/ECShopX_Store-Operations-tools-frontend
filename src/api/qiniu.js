import req from './req'

export function uploadQiniuPic(query) {
  return req.post('espier/image', query)
}
