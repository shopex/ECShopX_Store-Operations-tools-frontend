import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
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

  render() {
    const { type = 'normal', price, point, pointText = '积分', symbol = '¥' } = this.props

    return (
      <View
        className={classNames('sp-good-item-price', {
          [`discount`]: type === 'discount'
        })}
      >
        {`${symbol} ${price}`}
      </View>
    )
  }
}

export default SpGoodPrice
