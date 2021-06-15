import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { SpLoading, SpFormItem } from '@/components'
import RefuseTextarea from './comps/RefuseTextarea'
import WritePriceArea from './comps/WritePriceArea'
import { OrderRadio } from '@/components/sp-page-components'
import api from '@/api'
import './index.scss'

export default class OrderDeal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      isApprove: false,
      refuseReason: ''
    }
  }

  async componentDidShow() {
    const {
      router: {
        params: { aftersalesNo }
      }
    } = getCurrentInstance()

    const { aftersales_type } = await api.afterSales.detail({ no: aftersalesNo })

    this.setState({
      status: aftersales_type
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

  render() {
    const { status, loading, isApprove } = this.state

    return loading ? (
      <SpLoading>正在加载...</SpLoading>
    ) : (
      <View className='page-order-deal'>
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
                <WritePriceArea />
              </SpFormItem>
            )}
            {!isApprove && (
              <SpFormItem label='拒绝原因' className='formItemRefuse' wrap>
                <RefuseTextarea onChange={this.handleChangeRefuseReason} />
              </SpFormItem>
            )}
          </View>
        )}
      </View>
    )
  }
}
