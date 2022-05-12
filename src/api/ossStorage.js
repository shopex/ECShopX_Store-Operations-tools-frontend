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
    withCredentials: false,
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
  console.log('tokenRes', tokenRes, file)
  const token = S.getAuthToken()
  return Taro.uploadFile({
    url: tokenRes.host,
    header: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: false,
    formData: {
      key: tokenRes.dir,
      policy: tokenRes.policy,
      OSSAccessKeyId: tokenRes.accessid,
      signature: tokenRes.signature,
      name: file.name,
      success_action_status: 200,
      file: file
    }
  })
}
