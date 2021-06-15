import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button } from '@tarojs/components'
import { showToast } from '@/utils'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
const logo = require('../../assets/imgs/1.jpg')
@connect(({ planSelection }) => ({
  planSelection
}))
export default class My extends Component {
  constructor() {
    super()
    this.state = {
      username: '法外狂徒张三',
      mobile: '', // 手机
      head_portrait: '', // 个人头像
      work_userid: '', // 企业微信id
      distributors: null
    }
  }
  componentDidShow() {
    this.getMyInfoHandle()
  }
  async getMyInfoHandle() {
    const obj = {
      is_app: 1
    }
    const result = await api.my.getMyinfo(obj)
    const { username, mobile, head_portrait, work_userid, distributors } = result
    this.setState({
      username,
      mobile,
      head_portrait,
      work_userid,
      distributors
    })

    this.state.distributors && this.format_distributors(this.state.distributors)
  }
  format_distributors(data) {
    const { activeShop } = this.props.planSelection
    if (activeShop) {
      let { distributor_id } = activeShop
      distributor_id = distributor_id || '102'
      console.log(distributor_id)
      const result = data.filter((item) => {
        return item.distributor_id == distributor_id
      })
      this.setState(
        {
          distributors: result[0]
        },
        () => {
          console.log(this.state.distributors)
        }
      )
    }
  }
  getStore() {
    let obj = this.props.store.planSelection?.activeShop
    if (!obj) {
      return {}
    }
    return obj
  }
  formSubmit() {}
  handleChange(event) {
    console.log(event.target.value)
    if (event.target.value.length >= 10) {
      showToast('最多输入10个字符喔')
      return
    }
    this.setState({
      username: event.target.value
    })
  }

  notUpdate(message) {
    showToast(`${message}暂不支持修改！`)
  }
  photoUpdate() {
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    console.log(input)
    input.click()
    input.addEventListener('change', function () {
      console.log(input.files[0])
      input.remove()
    })
  }
  switchShopHandle() {
    Taro.redirectTo({
      url: '/pages/planSelection/index'
    })
  }

  render() {
    const { username, work_userid, mobile, head_portrait, distributors } = this.state
    return (
      <View className='page-my'>
        <View className='top'>
          <View className='info'>
            <View className='photo'>
              <Image src={distributors && distributors.logo}></Image>
            </View>
            <View className='content'>
              <View className='title'>{distributors && distributors.name}</View>
              {distributors && distributors.is_center && <View className='tag'>总部</View>}
            </View>
            <View className='iconfont icon-qiehuan1 switch-shop' onClick={this.switchShopHandle}>
              {' '}
              切换店铺
            </View>
          </View>
        </View>
        <View className='formBox'>
          <Form onSubmit={this.formSubmit.bind(this)}>
            <View className='photoBox'>
              <View className='iconfont icon-zu1684 title'> 我的头像</View>
              <View className='photo' onClick={(e) => this.photoUpdate()}>
                <Image src={logo || head_portrait}></Image>
              </View>
            </View>
            <View className='common'>
              <View className='iconfont icon-shoujihao title'> 手机号</View>
              <View className='value' onClick={(e) => this.notUpdate('手机号')}>
                {mobile}
              </View>
            </View>
            <View className='common'>
              <View className='iconfont icon-id title'> 企业微信ID</View>
              <View className='value' onClick={(e) => this.notUpdate('企业微信ID')}>
                {work_userid || 123}
              </View>
            </View>
            <View className='common borderNone'>
              <View className='iconfont icon-keai title'> 我的昵称</View>
              <View className='value'>
                <input
                  type='text'
                  maxLength={10}
                  value={username}
                  onChange={(e) => this.handleChange(e)}
                ></input>
              </View>
            </View>
          </Form>
        </View>
        {/* <Button className='btn'>修改密码</Button>
        <Button className='btn'>退出登录</Button> */}
      </View>
    )
  }
}
