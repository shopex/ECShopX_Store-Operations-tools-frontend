import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

class SpFixedAction extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { className, children } = this.props

    return <View className={classNames('sp-fixed-action', className)}>{children}</View>
  }
}
export default SpFixedAction
