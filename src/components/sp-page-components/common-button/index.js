import { View, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import './index.scss'

class CommonButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      onClick = () => {},
      className,
      size = 'normal',
      height = 80,
      type = 'default',
      text = '',
      plain = false
    } = this.props

    return (
      <View
        className={classNames('sp-page-common-button', className, {
          [`type-${type}`]: type,
          [`size-${size}`]: size,
          [`plain`]: plain
        })}
        style={{ height: Taro.pxTransform(height) }}
        onClick={onClick}
      >
        {text}
      </View>
    )
  }
}

export default CommonButton
