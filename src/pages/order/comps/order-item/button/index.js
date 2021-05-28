import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

export default class Button extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { type = 'default', children } = this.props

    return (
      <View
        className={classNames('order-item-button', {
          [`type-${type}`]: type
        })}
      >
        {children}
      </View>
    )
  }
}
