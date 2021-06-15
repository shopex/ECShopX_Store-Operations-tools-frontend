import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { showToast } from '@/utils'
import api from '@/api'
import { SpAddress } from '@/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

const logo = require('../../assets/imgs/arrow.png')

export default class SpEditForm extends Component {
  constructor() {
    super()
    this.state = {
      addressList: null,
      value: '',
      city: '',
      username: '',
      phone: '',
      addressDetail: ''
    }
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  onSubmit(event) {
    console.log(this.state.value)
  }
  openPicker() {
    console.log(1)
  }
  componentDidMount() {}
  render() {
    return (
      <View className='sp-editForm'>
        <View className='box'>
          <View className='title'>新增售后地址</View>
          <View className='content'>
            <AtForm onSubmit={this.onSubmit.bind(this)}>
              <AtInput
                name='value'
                title='所在地区'
                type='text'
                placeholder='所在省市'
                onFocus={this.openPicker}
                value={this.state.city}
                // onChange={this.handleChange.bind(this, 'value')}
              >
                <Image src={logo} />
              </AtInput>
              <AtInput
                name='value'
                title='联系人'
                type='text'
                placeholder='单行文本'
                value={this.state.username}
              />
              <AtInput
                name='value'
                title='联系方式'
                type='text'
                placeholder='单行文本'
                value={this.state.city}
              />
              <AtInput
                name='value'
                title='详细地址'
                type='text'
                placeholder='单行文本'
                value={this.state.username}
              />
            </AtForm>
          </View>

          <View className='ctrl'>
            <View className='item'>取消</View>
            <View className='item'>新增并选择</View>
          </View>
        </View>
      </View>
    )
  }
}
