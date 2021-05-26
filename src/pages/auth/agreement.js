import { useState } from 'react';
import Taro, { Component } from '@tarojs/taro'
import { View, Image,Text,ScrollView } from '@tarojs/components'
import { SpLinegradientButton,SpShopxLogo,SpBackToTop } from '@/components' 
import Drawer from './components/drawer'
import { useBackToTop } from '@/hooks'
import { getThemeStyle } from '@/utils'
import "./agreement.scss"

const AgreeMent = () => {
 
  const [visible,setVisible]=useState(false);

  const {
    showBackToTop,
    scrollTop,
    handleScroll,
    scrollBackToTop
  }=useBackToTop(); 

  const handleShow=()=>{
    setVisible(true);
  }

  const handleDrawerClose=()=>{
    setVisible(false)
  }
 

  return (
    <ScrollView scrollTop={scrollTop} className='page-agreement' scrollY style={getThemeStyle()} onScroll={handleScroll}>
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

      {/* 返回顶部 */}
      <SpBackToTop
          show={showBackToTop}
          onClick={scrollBackToTop}
      />
    </ScrollView>
  )
}

export default AgreeMent;