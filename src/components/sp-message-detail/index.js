// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'

import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'

export default class MessageDetail extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  formatSpec(spec) {
    if (spec.length > 0) {
      return spec.join('/')
    } else {
      return '/'
    }
  }

  render() {
    const {
      goodsName,
      total_fee,
      number,
      orderId,
      description,
      afterSalesBn,
      afterSaleType,
      goods_price,
      spec
    } = JSON.parse(this.props.SpMessageDetailData.content)
    const { is_read, operator_id } = this.props.SpMessageDetailData
    const { date, msgType, titleList, OrderHandle, clearUnread } = this.props

    return (
      <View className='cpn-messageDetail'>
        <View className='date'>{date}</View>
        <View className='box'>
          <View
            className='top'
            onClick={(e) => {
              OrderHandle(orderId, msgType, afterSalesBn)
              clearUnread(orderId, afterSalesBn)
            }}
          >
            {msgType === '1' && (
              <>
                <View className='titleBox'>
                  <View>{afterSaleType}</View>
                  {is_read === '0' && <View className='is_read'></View>}
                </View>

                <View className='iconfont icon-jiantou'></View>
              </>
            )}
            {(msgType == '2' || msgType == '3') && (
              <>
                <View className='titleBox'>
                  <View className='title'>{goodsName}</View>
                  {is_read === '0' && <View className='is_read'></View>}
                </View>

                <View className='iconfont icon-jiantou'></View>
              </>
            )}
          </View>
          <View className='list'>
            <View className='item'>
              <View className='title'>{titleList[0]}</View>
              {msgType == '1' && (
                <>
                  <View className='content'>{description}</View>
                </>
              )}
              {(msgType == '2' || msgType == '3') && (
                <>
                  <View className='content'>
                    数量{number}
                    {this.formatSpec(spec)}￥{goods_price}
                  </View>
                </>
              )}
            </View>
            <View className='item'>
              <View className='title'>{titleList[1]}</View>
              <View className='content order'>
                {msgType === '1' && (
                  <>
                    <View className='subtitle'>{goodsName}</View>
                    <View className='info '>
                      （数量：{number} / {goods_price}）
                    </View>
                  </>
                )}
                {(msgType == '2' || msgType == '3') && (
                  <>
                    <View className='info '>{total_fee}</View>
                  </>
                )}
              </View>
            </View>
            <View className='item'>
              <View className='title'>{titleList[2]}</View>
              <View className='content'>{orderId || afterSalesBn}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
