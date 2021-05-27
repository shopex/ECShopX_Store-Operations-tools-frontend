import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from '@/utils/classNames'
import './index.scss'

const ScrollButton = (props) => {
  const {
    children,
    className,
    refuseText = '不同意',
    confirmText = '同意并开始使用',
    ...restProps
  } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const handleChange = (index) => (e) => {
    setActiveIndex(index)
  }

  return (
    <View className={classNames('sp-confirm-scroll-button', className)} {...restProps}>
      <View
        className={classNames('activeTrack', className, {
          [`active-${activeIndex}`]: activeIndex === 0 || activeIndex === 1
        })}
      ></View>
      <View
        className={classNames('refuseText', 'text', {
          'active': activeIndex === 0
        })}
        onClick={handleChange(0)}
      >
        <Text>{refuseText}</Text>
      </View>
      <View
        className={classNames('confirmText', 'text', {
          'active': activeIndex === 1
        })}
        onClick={handleChange(1)}
      >
        <Text>{confirmText}</Text>
      </View>
    </View>
  )
}

export default React.memo(ScrollButton)
