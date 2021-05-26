import { useState } from 'react';
import { View, Image,Text } from '@tarojs/components'
import { SpLinegradientButton,SpShopxLogo } from '@/components' 
import Drawer from './components/drawer'
import "./agreement.scss"

const AgreeMent = () => {
 
  const [visible,setVisible]=useState(true);

  const handleShow=()=>{
    setVisible(true);
  }

  const handleDrawerClose=()=>{
    setVisible(false)
  }

  return (
    <View className='page-agreement'>
      <View className='page-agreement-header-logo'>
        <Image src={require('@/assets/imgs/logotitle.png')} className='img' />
      </View>
      <View className='page-agreement-header-title'>
        <Text className='text'>数据透视·智慧赋能·全渠道管理</Text>
      </View>
      <View className='page-agreement-body-logo'>
        <Image src={require('@/assets/imgs/logo1.png')} className='img' />
      </View>
      <View className='page-agreement-body-button'>
        <SpLinegradientButton 
          title={'开始我的数字化经营'} 
          onClick={handleShow}
        />
      </View>
      <SpShopxLogo />

      {/* 用户协议 */}
      <Drawer 
        visible={visible}
        onDrawerClose={handleDrawerClose}
      />

    </View>
  )
}

export default AgreeMent;