import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle } from '@/utils'
import { SpLoading, SpFormItem, SpInputNumber, SpToast } from '@/components'
import RefuseTextarea from './comps/RefuseTextarea'
import S from '@/spx'
import { OrderRadio, FixedAction, CommonButton } from '@/components/sp-page-components'
import api from '@/api'
import './index.scss'

export default class OrderDeal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      isApprove: false,
      refuseReason: '',
      afterSalesInfo: {},
      price: {}
    }
  }

  async componentDidShow() {
    const {
      router: {
        params: { aftersalesNo }
      }
    } = getCurrentInstance()

    const afterSalesInfo = await api.afterSales.detail({ no: aftersalesNo })

    this.setState({
      afterSalesInfo,
      status: afterSalesInfo.aftersales_type,
      price: {
        price: afterSalesInfo.refund_fee,
        point: afterSalesInfo.refund_point,
        maxPrice: afterSalesInfo.refund_fee,
        maxPoint: afterSalesInfo.refund_point,
        priceError: false,
        pointError: false
      }
    })
  }

  handleChangeApprove = (active) => {
    this.setState({
      isApprove: active === 1
    })
  }

  handleChangeRefuseReason = (reason) => {
    this.setState({
      refuseReason: reason
    })
  }

  handleChangePrice = (price) => {
    this.setState({
      price: {
        ...this.state.price,
        price: Number(price)
      }
    })
  }

  handleChangePoint = (point) => {
    this.setState({
      price: {
        ...this.state.price,
        point: Number(point)
      }
    })
  }

  //提交
  handleSubmit = () => {
    console.log('handleSubmit')
    this.handleValidInput()
  }

  //验证输入
  handleValidInput = () => {
    const { status, isApprove, refuseReason, price } = this.state
    if (status === 'ONLY_REFUND') {
      //如果是同意
      if (isApprove) {
        if (price.price === 0 && price.maxPrice !== 0) {
          this.setState({
            price: {
              ...price,
              priceError: '退款金额不能为空'
            }
          })
          return
        } else if (price.point === 0 && price.maxPoint !== 0) {
          this.setState({
            price: {
              ...price,
              pointError: '退款积分不能为空'
            }
          })
          return
        }
      } else {
        if (!refuseReason) {
          S.toast('请选择拒绝原因')
          return
        }
      }
    }
  }

  render() {
    const { status, loading, isApprove, afterSalesInfo, price } = this.state

    console.log('price', price)

    return loading ? (
      <SpLoading>正在加载...</SpLoading>
    ) : (
      <View className='page-order-deal' style={getThemeStyle()}>
        <SpFormItem label='处理结果'>
          <OrderRadio
            leftTitle='拒绝'
            rightTitle='同意'
            active={isApprove ? 1 : 0}
            onChange={this.handleChangeApprove}
          />
        </SpFormItem>

        {status === 'ONLY_REFUND' && (
          <View className='marginTop24'>
            {isApprove && (
              <SpFormItem label='处理方案' className='formItemPrice' wrap>
                <View className='page-order-deal-comps-writepricearea'>
                  <View className='form-price'>
                    <View className='labelc'>退款金额（元）</View>
                    <View className='value'>
                      <SpInputNumber
                        placeholder='请填写金额'
                        clear
                        error={price.priceError}
                        value={price.price}
                        onChange={this.handleChangePrice}
                      />
                    </View>
                  </View>
                  <View className='form-price marginTop16'>
                    <View className='labelc'>退款积分（分）</View>
                    <View className='value'>
                      <SpInputNumber
                        placeholder='请填写积分'
                        clear
                        error={price.pointError}
                        value={price.point}
                        onChange={this.handleChangePoint}
                      />
                    </View>
                  </View>
                </View>
              </SpFormItem>
            )}
            {!isApprove && (
              <SpFormItem label='拒绝原因' className='formItemRefuse' wrap>
                <RefuseTextarea onChange={this.handleChangeRefuseReason} />
              </SpFormItem>
            )}
          </View>
        )}

        <SpToast />

        <FixedAction>
          <CommonButton text='提交审核' type='primary' size='normal' onClick={this.handleSubmit} />
        </FixedAction>
      </View>
    )
  }
}
