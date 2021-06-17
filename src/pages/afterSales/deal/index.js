import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle, requestCallback } from '@/utils'
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

    //const addressList=await api.afterSales.address({page:1,page_size:10,distributor_id:afterSalesInfo.distributor_id,company_id:0})

    // console.log("addressList",addressList)

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
    this.setState(
      {
        price: {
          ...this.state.price,
          price: Number(price)
        }
      },
      () => {
        if (
          (Number(price) > 0 && this.state.price.maxPrice !== 0) ||
          Number(price) <= this.state.price.maxPrice
        ) {
          this.setState({
            price: {
              ...this.state.price,
              priceError: false
            }
          })
        }
      }
    )
  }

  handleChangePoint = (point) => {
    this.setState(
      {
        price: {
          ...this.state.price,
          point: Number(point)
        }
      },
      () => {
        if (
          (Number(point) > 0 && this.state.price.maxPoint !== 0) ||
          Number(point) <= this.state.price.maxPoint
        ) {
          this.setState({
            price: {
              ...this.state.price,
              pointError: false
            }
          })
        }
      }
    )
  }

  //提交
  handleSubmit = () => {
    const { afterSalesInfo, isApprove, refuseReason, price } = this.state

    let isValid = this.handleValidInput()

    if (isValid) {
      console.log('handleSubmit')
      requestCallback(
        async () => {
          const data = await api.afterSales.review({
            aftersales_bn: afterSalesInfo.aftersales_bn,
            is_approved: isApprove ? 1 : 0,
            refuse_reason: isApprove ? undefined : refuseReason,
            refund_fee: price.price,
            refund_point: price.point
          })
          return data
        },
        '审核成功',
        () => {
          Taro.navigateTo({ url: `/pages/afterSales/list` })
        }
      )
    }
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
        } else if (price.point > price.maxPoint) {
          this.setState({
            price: {
              ...price,
              pointError: '退款积分不能大于最大退款积分'
            }
          })
          return
        } else if (price.price > price.maxPrice) {
          this.setState({
            price: {
              ...price,
              priceError: '退款金额不能大于最大退款金额'
            }
          })
          return
        }
      } else {
        if (!refuseReason) {
          S.toast('请填写拒绝原因')
          return
        }
      }
    }

    return true
  }

  handleNavigateAdressList = () => {
    Taro.navigateTo({ url: '' })
  }

  handleClickAdress = () => {
    this.handleNavigateAdressList()
  }

  handleClickTip = () => {
    this.handleNavigateAdressList()
  }

  render() {
    const { status, loading, isApprove, afterSalesInfo, price } = this.state

    console.log('status', status)

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
                  <View className='form-price marginTop20'>
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
          </View>
        )}

        {status === 'REFUND_GOODS' && afterSalesInfo.progress === 0 && (
          <View className='marginTop24'>
            {isApprove && (
              <SpFormItem
                label='回寄地址'
                placeholder='请选择售后地址'
                wrap
                tip='修改售后地址'
                onClickValue={this.handleClickAdress}
                onClickTip={this.handleClickTip}
              >
                <View className='address'>
                  <View className='item'>
                    <View className='label'>联系人</View>
                    <View className='value'>我是联系人</View>
                  </View>
                  <View className='item'>
                    <View className='label'>电话号码</View>
                    <View className='value'>1388888888</View>
                  </View>
                  <View className='item'>
                    <View className='label'>回寄地址</View>
                    <View className='value'>上海市徐汇区宜山路700号普天信息产业园C1幢</View>
                  </View>
                </View>
              </SpFormItem>
            )}
          </View>
        )}

        {!isApprove && (
          <SpFormItem label='拒绝原因' className='formItemRefuse marginTop24' wrap>
            <RefuseTextarea onChange={this.handleChangeRefuseReason} />
          </SpFormItem>
        )}

        <SpToast />

        <FixedAction>
          <CommonButton text='提交审核' type='primary' size='normal' onClick={this.handleSubmit} />
        </FixedAction>
      </View>
    )
  }
}
