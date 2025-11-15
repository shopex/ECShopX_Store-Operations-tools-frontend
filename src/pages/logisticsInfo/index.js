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
import { View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import api from '@/api'
import { SpLoading, SpLogisticsDrawer, SpToast } from '@/components'
import { LogisticsPicker, TimeLineItem } from '@/components/sp-page-components'
import ChangeWL from './comps/changeWL'
import { timestampToTime, getThemeStyle } from '@/utils'
import './index.scss'

import { AtTimeline } from 'taro-ui'

export default class Logistics extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      deliveryList: [],
      current: {},
      loading: false,
      orderStatus: ''
    }
  }
  componentDidMount() {
    this.getConfig()
  }
  // 获取物流信息
  async getConfig() {
    this.setState({
      loading: true
    })

    const { order_id, order_status } = getCurrentInstance().router.params

    const query = {
      order_id: order_id
    }

    const { delivery_list: deliveryList, logs } = await api.logistics.getLogistics(query)

    this.setState({
      logs,
      deliveryList,
      loading: false,
      orderStatus: order_status
    })
  }

  formatLogs(logs) {
    let arr = []
    logs.map((item) => {
      return arr.push({
        title: timestampToTime(item.time) + ' ' + item.msg,
        delivery_remark: item.delivery_remark,
        pics: item.pics
      })
    })
    console.log(arr.reverse())
    return arr.reverse()
  }

  //编辑回调
  handleEditItem = (current, type) => {
    this.setState({
      current: {
        ...current,
        type
      }
    })
  }

  //关闭弹窗
  handleCloseDrawer = () => {
    this.setState({
      current: {}
    })
  }

  //设置item值
  setCurrentItem = (fieldObj) => {
    const { deliveryList, current } = this.state
    const findIndex = deliveryList.findIndex(
      (item) => item.orders_delivery_id === current.orders_delivery_id
    )
    deliveryList.splice(findIndex, 1, { ...deliveryList[findIndex], ...fieldObj })
    this.setState({
      deliveryList,
      current: {}
    })
  }

  //选择公司回调
  handleCompanyConfirm = ({ value, name }) => {
    this.setCurrentItem({
      delivery_corp_name: name,
      delivery_corp: value
    })
  }

  //确认物流单号回调
  handleNoConfirm = (value) => {
    this.setCurrentItem({
      delivery_code: value
    })
  }

  render() {
    const { current, deliveryList, loading, orderStatus } = this.state

    return (
      <View className='page-logisticsInfo' style={getThemeStyle()}>
        {loading && <SpLoading>正在加载...</SpLoading>}

        <SpLogisticsDrawer
          visible={current.order_id && current.type === 'no'}
          title='物流单号'
          onClose={this.handleCloseDrawer}
          onConfirm={this.handleNoConfirm}
          defaultValue={current.delivery_code}
        />

        <LogisticsPicker
          visible={current.order_id && current.type === 'company'}
          onClose={this.handleCloseDrawer}
          onConfirm={this.handleCompanyConfirm}
        />

        {/* 页面box */}
        {deliveryList?.map((deliveryItem) => {
          return (
            <View className='box'>
              <ChangeWL
                key={deliveryItem.orders_delivery_id}
                onEditItem={this.handleEditItem}
                deliveryInfo={deliveryItem}
                orderStatus={orderStatus}
              ></ChangeWL>
            </View>
          )
        })}

        {/* 页面时间线 */}
        {/* <View className='timeline'>
          {this.state.logs && <AtTimeline items={this.formatLogs(this.state.logs)}></AtTimeline>}
        </View> */}

        <View className='time-line-box'>
          {this.state.logs &&
            this.formatLogs(this.state.logs).map((item, idx) => (
              <TimeLineItem key={idx} item={item}></TimeLineItem>
            ))}
        </View>

        <SpToast />
      </View>
    )
  }
}
