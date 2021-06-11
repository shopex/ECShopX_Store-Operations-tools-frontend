import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from '@/utils/classNames'
import './index.scss'

const ScrollButton = (props) => {
  const {
    children,
    className,
    refuseText = '不同意',
    confirmText = '同意并开始使用',
    onReset = () => {},
    onConfirm = () => {},
    onTransitionEnd = () => {},
    isSubmit = false,
    ...restProps
  } = props

  //因为会销毁
  const [activeIndex, setActiveIndex] = useState(isSubmit ? 1 : 0)

  const handleChange = (index) => (e) => {
    console.log('handleChange', index)
    if (index === 0) {
      onReset()
    } else {
      onConfirm()
    }
    setActiveIndex(index)
  }

  const handleTransitionEnd = () => {
    onTransitionEnd(activeIndex === 1)
  }

  useEffect(() => {
    return () => {
      console.log('useEff')
    }
  }, [])

  console.log('setActiveIndex', activeIndex)

  return (
    <View className={classNames('sp-page-confirm-scroll-button', className)} {...restProps}>
      <View
        className={classNames('activeTrack', className, {
          [`active-${activeIndex}`]: activeIndex === 0 || activeIndex === 1
        })}
        onTransitionEnd={handleTransitionEnd}
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

export default ScrollButton
