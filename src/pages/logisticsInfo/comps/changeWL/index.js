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

import { PureComponent } from 'react'
import { View, Image, Text, Picker } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'

export default class ChangeWL extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showEdit: false
    }
  }
  handleSave = async () => {
    const { delivery_code, delivery_corp, orders_delivery_id } = this.props.deliveryInfo

    const obj = {
      delivery_corp,
      delivery_code
    }

    await api.logistics.updateLogistics(orders_delivery_id, obj)

    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  handleSwitch() {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  //点击编辑
  handleEditItem = (type) => {
    const { deliveryInfo, onEditItem } = this.props
    onEditItem(deliveryInfo, type)
  }

  render() {
    const { showEdit } = this.state
    const { deliveryInfo, orderStatus, isEdit } = this.props
    return (
      <>
        {deliveryInfo && (
          <View className='cpn-spChangeWL'>
            <View className='bar'>
              <View className='title'>物流公司</View>
              {deliveryInfo?.delivery_corp != 'SELF_DELIVERY' && orderStatus !== 'DONE' && (
                <View className='content'>
                  {showEdit ? (
                    <Text className='iconfont icon-queren update' onClick={this.handleSave}>
                      {' '}
                      确认修改
                    </Text>
                  ) : (
                    <View
                      className='iconfont icon-xiugai update'
                      onClick={this.handleSwitch.bind(this)}
                    >
                      {' '}
                      修改物流
                    </View>
                  )}
                </View>
              )}
            </View>
            <View className='list'>
              <View className='title'>快递公司</View>
              <View className='content'>
                <Text className='value'>{deliveryInfo.delivery_corp_name} </Text>
                {showEdit && (
                  <Text className='edit' onClick={this.handleEditItem.bind(this, 'company')}>
                    {' '}
                    编辑
                  </Text>
                )}
              </View>
            </View>
            <View className='list'>
              <View className='title'>物流单号</View>
              <View className='content'>
                <Text className='value'>{deliveryInfo.delivery_code} </Text>
                {showEdit && (
                  <Text className='edit' onClick={this.handleEditItem.bind(this, 'no')}>
                    {' '}
                    编辑
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </>
    )
  }
}
