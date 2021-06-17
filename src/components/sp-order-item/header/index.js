import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { copyContent } from '@/utils'
import { OrderStatus } from '@/components/sp-page-components'

export default class No extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderNo = () => {
    const { info, pageType } = this.props
    if (pageType === 'orderList') {
      return info.order_id
    } else if (pageType === 'afterSalesList') {
      return info.aftersales_bn
    }
  }

  handleCopy = () => {
    const { info, pageType } = this.props
    if (pageType === 'orderList') {
      copyContent(info.order_id)
    } else if (pageType === 'afterSalesList') {
      copyContent(info.aftersales_bn)
    }
  }

  renderStatus = () => {
    const { info, pageType } = this.props
    if (pageType === 'orderList') {
      return info?.app_info?.list_status_mag
    } else if (pageType === 'afterSalesList') {
      return info?.app_info?.status_msg
    }
  }

  renderDate = () => {
    const { info, pageType } = this.props
    if (pageType === 'orderList') {
      return info?.create_date
    } else if (pageType === 'afterSalesList') {
      return info?.app_info?.create_date
    }
  }

  render() {
    return (
      <View className='order-header'>
        <View className='order-no'>
          <Text className='no'>{this.renderNo()}</Text>
          <Text className='copy' onClick={this.handleCopy}>
            复制
          </Text>
        </View>
        <View className='order-time'>{this.renderDate()}</View>

        <OrderStatus msg={this.renderStatus()} />
      </View>
    )
  }
}
