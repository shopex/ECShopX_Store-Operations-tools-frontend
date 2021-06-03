import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

const ShopxLogo = (props) => {
  return (
    <View className='sp-page-shopx-logo'>
      <Image src={require('@/assets/imgs/system-logo.png')} className='img' />
    </View>
  )
}

export default React.memo(ShopxLogo)
