import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtFloatLayout } from 'taro-ui'
import { showToast } from '@/utils'
import api from '@/api'
import { SpPickerZ } from '@/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

const logo = require('../../assets/imgs/arrow.png')

export default class SpEditForm extends Component {
  constructor() {
    super()
    this.state = {
      addressList: null,
      Cityinfo: '',
      province: '',
      city: '',
      area: '',
      username: '',
      phone: '',
      addressDetail: '',
      selectList: null,
      isShow: false
    }
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  formatArr(arr) {
    arr.forEach((element) => {
      element = `'${element}'`
    })
    return arr
  }
  async onSubmit(event) {
    console.log(11111)
    const { city, province, area, username, phone, addressDetail, Cityinfo } = this.state
    const a = Cityinfo.path.split(',')
    if (city && username && phone && addressDetail) {
      const obj = {
        distributor_id: "['102']",
        province,
        city,
        area,
        regions_id: `['${a[0]}','${a[1]}','${a[2]}']`,
        address: addressDetail,
        regions: `['${province}','${city},'${area}']`,
        contact: username,
        mobile: phone
      }

      const result = await api.address.postAddressList(obj)
      console.log(result)
      showToast('ok')
    } else {
      showToast('请输入完整信息')
      return
    }
    // const
    // console.log(this.state.value)
  }
  isShowHandle() {
    this.setState({
      isShow: false
    })
  }
  // 获取省市区子组件的数据
  getCityHandle(province, city, area, seletedItem) {
    // const {province,city,area,seletedItem} = CityObj
    console.log(province, city, area, seletedItem)
    this.setState({
      Cityinfo: seletedItem,
      city,
      area,
      province,

      // city:province+'/'+city+'/'+area,
      isShow: false
    })
    // console.log(this.state.Cityinfo.path.split(','));
    // const a = this.formatArr(this.state.Cityinfo.path.split(','))
    // console.log(a);
  }

  async openPicker() {
    const result = await api.address.areaList()
    this.setState({
      selectList: result,
      isShow: true
    })
  }

  usernameChangeHandle(event) {
    this.setState({
      username: event
    })
  }
  addressDetailChangeHandle(value) {
    this.setState({
      addressDetail: value
    })
  }
  phoneChangeHandle(value) {
    this.setState({
      phone: value
    })
  }
  componentDidMount() {}
  render() {
    const { isShowEditHandle } = this.props
    const { province, city, area, username, phone, addressDetail, isShow } = this.state
    return (
      <View className='sp-editForm'>
        <View className='box'>
          <View className='title'>新增售后地址</View>
          <View className='content'>
            <AtForm>
              <AtInput
                name='value'
                title='所在地区'
                type='text'
                placeholder='所在省市'
                onFocus={(e) => {
                  this.openPicker()
                }}
                value={province ? province + '/' + city + '/' + area : ''}
              >
                <Image src={logo} />
              </AtInput>
              <AtInput
                name='value'
                title='联系人'
                type='text'
                placeholder='售后联系人姓名'
                value={username}
                onChange={(e) => this.usernameChangeHandle(e)}
              />
              <AtInput
                name='value'
                title='联系方式'
                type='text'
                placeholder='售后联系人手机或座机号码'
                value={phone}
                onChange={(e) => this.phoneChangeHandle(e)}
              />
              <AtInput
                name='value'
                title='详细地址'
                type='text'
                placeholder='详细到门牌号'
                value={addressDetail}
                onChange={(e) => this.addressDetailChangeHandle(e)}
              />
            </AtForm>
          </View>

          <View className='ctrl'>
            <View className='item' onClick={isShowEditHandle}>
              取消
            </View>
            <View className='item' onClick={(e) => this.onSubmit()}>
              新增并选择
            </View>
          </View>
        </View>
        {/* <AtFloatLayout isOpened={this.state.isShow}>
              <SpPickerZ selectList={this.state.selectList}></SpPickerZ>
        </AtFloatLayout> */}
        {isShow && (
          <SpPickerZ
            getCityHandle={this.getCityHandle.bind(this)}
            isShowHandle={(e) => this.isShowHandle()}
            selectList={this.state.selectList}
          ></SpPickerZ>
        )}
      </View>
    )
  }
}
