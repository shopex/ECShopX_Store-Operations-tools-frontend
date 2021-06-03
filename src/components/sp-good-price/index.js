import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import Taro from '@tarojs/taro'
import './index.scss'

/**
 * 1.type 存在normal/discount 表示折扣与非折扣
 * 2.price 表示价格
 * 3.point 表示显示积分 如果值不为空则此时为积分商品
 * 4.pointText 接受pointText表示积分的别名
 * 5.symbol 表示价格的单位
 */
class SpGoodPrice extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderPrice = () => {
    const { price, symbol = '¥' } = this.props

    const priceArr = (Number(price) / 100).toFixed(2).split('.')

    return (
      <View className='price'>
        <View className='symbol'>{symbol}</View>
        <View className='integer'>{`${priceArr[0]}.`}</View>
        <View className='decimal'>{`${priceArr[1]}`}</View>
      </View>
    )
  }

  renderPoint = () => {
    const { point, pointText = '积分' } = this.props

    return (
      <View className='point'>
        <View className='number'>{point}</View>
        <View className='symbol'>{pointText}</View>
      </View>
    )
  }

  renderPricePoint = () => {
    return (
      <View className='pointandprice'>
        {this.renderPoint()}
        {' + '}
        {this.renderPrice()}
      </View>
    )
  }

  render() {
    const { type = 'normal', price, size = '28', point } = this.props

    return (
      <View
        className={classNames('sp-good-item-price', {
          [`discount`]: type === 'discount'
        })}
        style={{
          fontSize: Taro.pxTransform(size)
        }}
      >
        {price && !point && this.renderPrice()}
        {point && !price && this.renderPoint()}
        {point && price && this.renderPricePoint()}
      </View>
    )
  }
}

export default SpGoodPrice
