import { Component, createElement } from 'react'
import { View, ScrollView, Image, Form, Input, Button } from '@tarojs/components'
import { showToast } from '@/utils'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
// import { connect } from 'react-redux'

// @connect(({ planSelection }) => ({
//   planSelection
// }))
export default class SpAddress extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {}
  }

  notUpdate(message) {
    showToast(`${message}暂不支持修改！`)
  }

  render() {
    const { addressList } = this.props
    return (
      <ScrollView className='sp-address'>
        {addressList.map((item) => {
          return (
            <View className='item' key={item.address_id}>
              <View className={'btn ' + (item.is_default && 'active')}>
                <View className='right iconfont icon-gouxuan-01'></View>
              </View>
              <View className='address'>
                <View className='title'>
                  {item.province + item.city + item.area + item.address}
                </View>
                <View className='name_tel'>{item.contact + '  ' + item.mobile}</View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}
