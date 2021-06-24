import { Component, createElement } from 'react'
import { View, Image, Form, Input, Button } from '@tarojs/components'
import { showToast, strLength } from '@/utils'
import api from '@/api'
import UploadUtil from '@/utils/uploadUtil'

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
    console.log(result)
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

  formSubmit() {}
  usernameChange(event) {
    console.log(event.target.value)
    let str = strLength(event.target.value)
    if (str > 20) {
      showToast('最多输入10个字符喔')
      return
    }

    this.setState({
      username: event.target.value
    })
  }
  async usernameBlur() {
    const result = await api.my.updateInfo({
      username: this.state.username
    })
    console.log(result)
  }

  notUpdate(message) {
    showToast(`${message}暂不支持修改！`)
  }

  // 上传头像
  async handleAvatar() {
    const { tempFiles = [] } = await Taro.chooseImage({
      count: 1
    })

    console.log(tempFiles)
    // const res = await imgUploader.uploadImageFn(imgFiles)
    // console.log(res)
    // let head_portrait = res[0].url
    // console.log(head_portrait)
    // this.setState({
    //   head_portrait
    // })
    // const result = await api.my.updateInfo({
    //   head_portrait
    // })
    // console.log(result)

    const upload = new UploadUtil()
    // console.log(imgFiles);
    console.log(tempFiles[0])

    // 上传
    upload
      .uploadImg(tempFiles[0].originalFileObj, tempFiles[0].originalFileObj.name)
      .then((res) => {
        console.log(res)
      })
  }

  photoUpdate() {
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    console.log(input)
    input.click()
    input.addEventListener('change', async function () {
      const result = await api.my.updatePhoto({
        head_portrait: input.files[0]
      })
      console.log(result)

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
              <View className='photo' onClick={(e) => this.handleAvatar()}>
                <Image src={head_portrait}></Image>
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
                  onChange={(e) => this.usernameChange(e)}
                  onBlur={(e) => this.usernameBlur(e)}
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
