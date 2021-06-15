import React, { PureComponent } from 'react'
import { View, Input } from '@tarojs/components'
import { SpInputNumber } from '@/components'

export default class WritePriceArea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      noteContent: ''
    }
  }

  handleChangeNote = (value) => {
    const { onChange = () => {} } = this.props

    this.setState({
      noteContent: value
    })
    onChange(value)
  }

  render() {
    return (
      <View className='page-order-deal-comps-writepricearea'>
        <View className='form-price'>
          <View className='labelc'>退款金额（元）</View>
          <View className='value'>
            <SpInputNumber placeholder='请填写金额' clear />
          </View>
        </View>
        <View className='form-price marginTop16'>
          <View className='labelc'>退款积分（分）</View>
          <View className='value'>
            <SpInputNumber placeholder='请填写积分' clear />
          </View>
        </View>
      </View>
    )
  }
}
