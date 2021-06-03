import React, { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import { classNames } from '@/utils'
import { SpGoodPrice } from '@/components'
import './index.scss'

class SpGoodItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderSalePrice = () => {
    const {
      orderInfo: { order_class },
      goodInfo
    } = this.props
    //如果是积分订单
    if (order_class === 'pointsmall') {
      return <SpGoodPrice type='normal' point={goodInfo.point} />
    } else {
      return <SpGoodPrice price={goodInfo.item_fee} />
    }
  }

  renderOriginPrice = () => {
    const {
      orderInfo: { order_class },
      goodInfo
    } = this.props
    //如果是积分订单
    if (order_class === 'pointsmall') {
      return <SpGoodPrice type='discount' point={goodInfo.point} />
    } else {
      return <SpGoodPrice type='discount' size={22} price={goodInfo.market_price} />
    }
  }

  render() {
    const { goodInfo, className } = this.props

    return (
      <View className={classNames('sp-good-item', className)}>
        <View className='sp-good-item-image'>
          <Image className='img' src={goodInfo.pic} />
        </View>
        <View className='sp-good-item-content'>
          <View className='sp-good-item-content_name'>{goodInfo.item_name}</View>
          <View className='sp-good-item-content_spec'>{goodInfo.item_spec_desc}</View>
          <View className='sp-good-item-content_number'>货号：{goodInfo.item_bn}</View>
        </View>
        <View className='sp-good-item-rightextra'>
          <View className='sp-good-item-rightextra-price'>{this.renderSalePrice()}</View>
          <View className='sp-good-item-rightextra-originprice'>{this.renderOriginPrice()}</View>
          <View className='sp-good-item-rightextra-goodnumber'>X {goodInfo.num}</View>
        </View>
      </View>
    )
  }
}

export default SpGoodItem
