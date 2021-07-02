import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle, timestampToTime, classNames } from '@/utils'
import { SpGoodItem, SpGoodPrice, SpToast, SpLoading } from '@/components'
import { DetailCard, FixedAction, PageActionButtons } from '@/components/sp-page-components'
import { View, Text, Image } from '@tarojs/components'
import { afterSales } from '@/consts'
import api from '@/api'
import './index.scss'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //订单详情
      orderInfo: {},
      pageType: 'afterSalesDetail',
      detail: {},
      timer: {
        mm: 0,
        ss: 0
      },
      tradeInfo: {},
      userInfo: {},
      leftContent: [],
      rightContent: [],
      logisticsList: [],
      leftPhone: '',
      rightPhone: '',
      loading: false
    }
  }

  async componentDidShow() {
    const {
      router: {
        params: { aftersalesNo }
      }
    } = getCurrentInstance()
    this.setState({
      loading: true
    })
    const detail = await api.afterSales.detail({ no: aftersalesNo })
    this.setState({
      detail
    })
    this.setState({
      loading: false
    })
  }

  render() {
    const {
      orderInfo,
      pageType,
      tradeInfo,
      leftContent,
      rightContent,
      leftPhone,
      rightPhone,
      logisticsList,
      loading,
      detail
    } = this.state

    let terminal_info = orderInfo?.app_info?.terminal_info

    return loading ? (
      <SpLoading>正在加载...</SpLoading>
    ) : (
      <View className='page-aftersales-detail' style={getThemeStyle()}>
        <DetailCard pageType={pageType} detail={detail} />

        <View className='card-center'>
          <View className='title'>申请信息</View>
          <View className='item'>
            <View className='label'>退货理由</View>
            <View className='value'>{detail?.reason}</View>
          </View>
          <View className='item'>
            <View className='label'>退货描述</View>
            <View className='value'>{detail?.description}</View>
          </View>
          <View className='item'>
            <View className='label'>图片信息</View>
            <View className={classNames('value', { ['picwrapper']: true })}>
              {detail?.evidence_pic?.map((pic) => (
                <View className='pic'>
                  <Image src={pic} className='image' />
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className='good-detail'>
          <View className='good-detail-content'>
            {detail?.detail?.map((goodItem, index) => (
              <SpGoodItem
                goodInfo={goodItem}
                orderInfo={detail?.order_info}
                className='goodItem'
                pageType={pageType}
                key={index}
              />
            ))}
          </View>
        </View>

        <View className='card-bottom'>
          <View className='item'>售后单号：{detail?.aftersales_bn}</View>
          <View className='item'>订单号：{detail?.order_id}</View>
          <View className='item'>
            售后类型：{afterSales.AFTERSALES_TYPE[detail?.aftersales_type]}
          </View>
          <View className='item'>申请时间：{timestampToTime(detail?.create_time)}</View>
          <View className='item'>
            <Text>应退总金额：</Text>
            <SpGoodPrice className='refundFee' price={detail?.refund_fee} isSame size={24} />
          </View>
          <View className='item'>
            <Text>应退总积分：</Text>
            <SpGoodPrice className='refundFee' point={detail?.refund_point} isSame size={24} />
          </View>
        </View>

        <SpToast />

        <FixedAction pageType={pageType}>
          <PageActionButtons
            buttons={detail?.app_info?.buttons}
            pageType={pageType}
            orderInfo={{ ...detail?.order_info, aftersales_bn: detail?.aftersales_bn }}
            maxOrderInfo={detail}
          />
        </FixedAction>
      </View>
    )
  }
}

export default OrderDetail
