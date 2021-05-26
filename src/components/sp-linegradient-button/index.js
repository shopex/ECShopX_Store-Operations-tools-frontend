import React from 'react';
import { View,Text } from '@tarojs/components'
import './index.scss';

const SpLinegradientButton=(props)=>{

    const { title,onClick=()=>{} }=props;

    return (
        <View className='sp-linegradient-button' onClick={onClick}>
            <Text className='title'>{title}</Text>
        </View>
    )

}

export default React.memo(SpLinegradientButton);