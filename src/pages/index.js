import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component, PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { SpLoading } from '@/components'
import { withLogin } from '@/hocs'
import api from '@/api'
import { requestCallback, formatNum, qwsdk } from '@/utils'
import { connect } from 'react-redux'
import './index.scss'

@connect(({ planSelection }) => ({
  planSelection: planSelection.activeShop
}))
@withLogin()
class Index extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      moneyShow: true,
      realTimeData: {
        real_payed_fee: 1, //  实付金额
        real_payed_orders: 2, // 支付订单数
        real_payed_members: 3, // 实付会员数
        real_atv: 4, // 客单价
        real_refunded_fee: 5, //退款金额
        real_aftersale_count: 6, //售后订单数
        real_deposit: 7 // 新增储蓄
      },
      loading: true,
      apis: {
        aftersales: '',
        order: ''
      },
      is_center: false
    }
  }
  async getConfig() {
    let { distributor_id } = this.props.planSelection
    if (distributor_id != null) {
      const result = await api.home.getStatistics({ shop_id: distributor_id, is_app: 1 })
      this.setState({
        realTimeData: result.today_data,
        apis: result.apis
      })
    }
  }
  componentDidMount() {
    const { href } = window.location
    qwsdk.init({
      url: href
    })
  }
  componentDidShow() {
    this.getConfig()
  }

  switchHandle() {
    this.setState({
      moneyShow: !this.state.moneyShow
    })
  }
  goOrderPageHandle() {
    Taro.navigateTo({
      url: '/pages/order/list'
    })
  }

  goAfterSalesPageHandle = () => {
    Taro.navigateTo({
      url: '/pages/afterSales/list'
    })
  }

  formatA(num) {
    var result = parseFloat(num)
    if (isNaN(result)) {
      console('传递参数错误，请检查！')
      return false
    }
    result = Math.round(num * 100) / 100
    var s_x = result.toString()
    var pos_decimal = s_x.indexOf('.')
    if (pos_decimal < 0) {
      pos_decimal = s_x.length
      s_x += '.'
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0'
    }
    return s_x
  }

  handleOnScanQRCode = async () => {
    const res = await qwsdk.scanQRCode()

    requestCallback(
      async () => {
        const data = await api.order.qrwriteoff({
          code: res.replace('ZT_', '')
        })
        return data
      },
      '核销订单成功',
      ({ order_id }) => {
        Taro.navigateTo({ url: `/pages/order/detail?order_id=${order_id}` })
      },
      () => {
        this.setState({
          veriError: '核销码不存在或有误，请检查！'
        })
      }
    )
  }

  render() {
    const { moneyShow, realTimeData, loading, apis, is_center } = this.state

    const { name, logo } = this.props.planSelection
    return (
      <View className='page-index'>
        <>
          <View className='top'>
            <View className='shop-title'>
              <View className='avatar'>
                <Image className='photo' src={logo}></Image>
              </View>
              <View className='title'>{name}</View>
            </View>
          </View>
          <View className='current-status'>
            <View className='big-title'>
              <View className='iconfont icon-gaikuang'></View>
              <Text>实时概况</Text>
            </View>
            <View className='spend-money'>
              <View className='title'>
                <Text>实付金额（元）</Text>
                {moneyShow ? (
                  <View
                    className='iconfont icon-yincang'
                    onClick={() => {
                      this.switchHandle()
                    }}
                  ></View>
                ) : (
                  <View
                    className='iconfont icon-xianshi'
                    onClick={() => {
                      this.switchHandle()
                    }}
                  ></View>
                )}
              </View>
              <View className='money'>
                {moneyShow ? (
                  <Text>{this.formatA(realTimeData.real_payed_fee / 100)}</Text>
                ) : (
                  <Text>****</Text>
                )}
              </View>
            </View>
            <View className='list'>
              <View className='pay-order'>
                <View className='title'>支付订单（笔）</View>
                <View className='color-white'>{realTimeData.real_payed_orders}</View>
              </View>
              <View className='pay-order'>
                <View className='title'>售后订单（笔）</View>
                <View className='color-white'>{realTimeData.real_aftersale_count}</View>
              </View>
            </View>

            <View className='list list-2'>
              <View className='pay-order'>
                <View className='title'>退款（元）</View>

                <View className='color-gray'>
                  {this.formatA(realTimeData.real_refunded_fee / 100)}
                </View>
              </View>
              <View className='pay-order'>
                <View className='title'>实付会员（人）</View>
                <View className='color-gray'>{realTimeData.real_payed_members}</View>
              </View>
            </View>
            <View className='list list-2'>
              <View className='pay-order'>
                <View className='title'>客单价（元）</View>
                <View>{this.formatA(realTimeData.real_atv / 100)} </View>
              </View>
              <View className='pay-order'>
                {is_center && (
                  <>
                    <View className='title'>新增储值（元）</View>
                    <View>{this.formatA(realTimeData.real_deposit / 100)}</View>
                  </>
                )}
              </View>
            </View>
          </View>
          <View className='func-list'>
            <View className='title'>常用功能</View>
            <View className='list'>
              {apis.order && (
                <View className='item' onClick={this.goOrderPageHandle}>
                  <View>
                    <Image className='img' src={require('@/assets/imgs/index/dingdan.svg')}></Image>
                  </View>
                  <View className='subtitle'>订单</View>
                </View>
              )}
              {apis.aftersales && (
                <View className='item' onClick={this.goAfterSalesPageHandle}>
                  <View>
                    <Image className='img' src={require('@/assets/imgs/index/shouhou.svg')}></Image>
                  </View>
                  <View className='subtitle'>售后</View>
                </View>
              )}

              <View className='item' onClick={this.handleOnScanQRCode.bind(this)}>
                <View>
                  <Image
                    className='img'
                    src={require('@/assets/imgs/index/shaoyishao.svg')}
                  ></Image>
                </View>
                <View className='subtitle'>扫一扫</View>
              </View>
              {/* 
              {funcList.map((item) => {
                return (
                  <View className='item' key={item.title}>
                    <View>
                      <Image className='img' src={item.icon}></Image>
                    </View>
                    <View className='subtitle'>{item.title}</View>
                  </View>
                )
              })} */}
            </View>
          </View>
        </>
      </View>
    )
  }
}

export default Index
