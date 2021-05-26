
import React from 'react';
import { View, Image, Text } from '@tarojs/components'
// import { AtFloatLayout } from "taro-ui"

const Drawer = (props) => {

    const { visible,onDrawerClose=()=>{} } = props;

    return (
        <View>
            {/* <AtFloatLayout isOpened={visible}  onClose={onDrawerClose}>
                这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
                随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
            </AtFloatLayout> */}
        </View>
    )
}

export default React.memo(Drawer);