import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import { ORDER_DETAIL_ICON } from '@/consts'
import './index.scss'

export default class OrderIcon extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderIcon = () => {
    const { status } = this.props
    return ORDER_DETAIL_ICON[status]
  }

  render() {
    return (
      <View className={classNames('sp-page-order-icon', this.props.className)}>
        <Text className={classNames('iconfont', this.renderIcon())}></Text>
      </View>
    )
  }
}
