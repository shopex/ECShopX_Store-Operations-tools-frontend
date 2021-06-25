import Taro from '@tarojs/taro'
import req from './req'
import axios from 'axios'
import S from '@/spx'

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
export function LocalUpload(tokenRes, file, filetype = 'image') {
  console.log(tokenRes)
  console.log(file)
  const token = S.getAuthToken()
  return Taro.uploadFile({
    url: `${req.baseURL}espier/upload_localimage`,
    // filePath: item.url,
    // name: 'images',
    header: {
      'Authorization': `Bearer ${token}`
    },
    formData: {
      ...tokenRes,
      images: file,
      filetype
    }
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
