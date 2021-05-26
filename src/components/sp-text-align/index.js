import React from 'react';
import { View } from '@tarojs/components';
import classNames from '@/utils/classNames';
import './index.scss';

const SpTextAlign=(props)=>{ 

    const { children,className,...restProps } =props;

    return (
        <View className={classNames('sp-text-align',className)} {...restProps}>
            {children}
        </View>
    )

}

export default React.memo(SpTextAlign);