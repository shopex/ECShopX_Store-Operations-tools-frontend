import { View, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import './index.scss'

class SpCommonButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { className, size = 'normal', height = 80, type = 'primary', text = '' } = this.props

    return (
      <View
        className={classNames('sp-common-button', className, {
          [`type-${type}`]: type,
          [`size-${size}`]: size
        })}
        style={{ height: Taro.pxTransform(height) }}
      >
        {text}
      </View>
    )
  }
}

export default SpCommonButton
