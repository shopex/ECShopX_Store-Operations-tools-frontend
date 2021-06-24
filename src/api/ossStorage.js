import fetch from './req'
import req from './req'
import axios from 'axios'

/**
 * @description: 获取上传Token
 * @param {params: 'image' or 'video' }
 */
// export const getOssToken = (params = {
//   filetype: 'image'
// }) => {
//   debugger
//   return fetch({
//     url: '/espier/oss_upload_token',
//     method: 'post',
//     data: params
//   })
// }

export function getOssToken(params) {
  return req.post('/espier/oss_upload_token', params)
}

// 本地上传
// export const LocalUpload = (tokenRes, file, filetype = 'image') => {
//   return fetch({
//     url: '/espier/upload_localimage',
//     method: 'post',
//     data: {
//       ...tokenRes,
//       images: file,
//       filetype,
//       isUploadFile: true
//     }
//   })
// }
export function LocalUpload(tokenRes, file, filetype = 'image') {
  console.log(tokenRes)
  console.log(file)
  return req.post('/espier/upload_localimage', {
    ...tokenRes,
    images: file,
    filetype,

    isUploadFile: true
  })
}

export const AliUpload = (tokenRes, file) => {
  const formData = new FormData()
  formData.append('key', tokenRes.dir)
  formData.append('policy', tokenRes.policy)
  formData.append('OSSAccessKeyId', tokenRes.accessid)
  formData.append('success_action_status', '200')
  // formData.append('callback', tokenRes.callback)
  formData.append('signature', tokenRes.signature)
  formData.append('name', file.name)
  formData.append('file', file)
  return axios({
    method: 'POST',
    url: tokenRes.host,
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data: formData
  })
}
