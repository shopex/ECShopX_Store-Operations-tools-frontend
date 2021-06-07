import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button } from '@tarojs/components'
import { showToast } from '@/utils'
import api from '@/api'
import './index.scss'

const logo = require('../../assets/imgs/1.jpg')

export default class My extends Component {
  constructor() {
    super()
    this.state = {
      username: '法外狂徒张三',
      shopList: null
    }
  }
  componentDidMount() {
    this.getMyInfoHandle()
  }
  async getMyInfoHandle() {
    const result = await api.my.getMyinfo()

    console.log(result)
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

  render() {
    const { username } = this.state
    return (
      <View className='page-my'>
        <View className='top'>
          <View className='info'>
            <View className='photo'>
              <Image src={logo}></Image>
            </View>
            <View className='content'>
              <View className='title'>徐家汇汇港恒隆旗舰店</View>
              <View className='tag'>总部</View>
            </View>
            <View className='iconfont icon-qiehuan1 switch-shop'> 切换店铺</View>
          </View>
        </View>
        <View className='formBox'>
          <Form onSubmit={this.formSubmit.bind(this)}>
            <View className='photoBox'>
              <View className='iconfont icon-zu1684 title'> 我的头像</View>
              <View className='photo' onClick={(e) => this.photoUpdate()}>
                <Image src={logo}></Image>
              </View>
            </View>
            <View className='common'>
              <View className='iconfont icon-shoujihao title'> 手机号</View>
              <View className='value' onClick={(e) => this.notUpdate('手机号')}>
                12345678912
              </View>
            </View>
            <View className='common'>
              <View className='iconfont icon-id title'> 企业微信ID</View>
              <View className='value' onClick={(e) => this.notUpdate('企业微信ID')}>
                zyk121212121
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
        <Button className='btn'>修改密码</Button>
        <Button className='btn'>退出登录</Button>
      </View>
    )
  }
}
