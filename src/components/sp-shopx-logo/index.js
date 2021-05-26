import React from 'react';
import { View,Image } from '@tarojs/components'
import './index.scss';

const SpShopxLogo=(props)=>{ 

    return (
        <View className='sp-shopx-logo'>
            <Image src={require('@/assets/imgs/system-logo.png')} className='img' />
        </View>
    )

}

export default React.memo(SpShopxLogo);