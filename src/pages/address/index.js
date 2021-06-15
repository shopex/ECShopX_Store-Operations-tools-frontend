import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button, Picker } from '@tarojs/components'
import { showToast } from '@/utils'
import api from '@/api'
import { SpAddress, SpEditForm } from '@/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
const logo = require('../../assets/imgs/1.jpg')
@connect(({ planSelection }) => ({
  planSelection
}))
export default class Address extends Component {
  constructor() {
    super()
    this.state = {
      addressList: null
    }
  }
  componentDidMount() {
    this.getConfig()
  }

  notUpdate(message) {
    showToast(`${message}暂不支持修改！`)
  }
  async getConfig() {
    const data = {
      page: 1,
      page_size: 10
    }
    const result = await api.address.getAddressList(data)
    this.setState({
      addressList: result.list
    })
    console.log(result)
  }
  incrementAddress() {
    console.log(123)
  }

  render() {
    return (
      <View className='page-address'>
        <View className='nav'>
          <View className='left'>我的售后地址</View>
          <View className='iconfont icon-xinzengdizhi right' onClick={this.incrementAddress}>
            {' '}
            新增地址
          </View>
        </View>
        {this.state.addressList && (
          <View>
            <SpAddress addressList={this.state.addressList}></SpAddress>
          </View>
        )}

        <View className='confirm'>
          <View className='btn'>选择此地址</View>
        </View>

        <SpEditForm></SpEditForm>
      </View>
    )
  }
}
