import { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { SpRadio } from '@/components'

const photo = require('@/assets/imgs/1.jpg')
const logo = require('@/assets/imgs/shopex-logo.png')

const SpRadioData = [
  {
    title: '徐家汇港汇恒隆旗舰店',
    photo,
    isCenter: true
  },
  {
    title: '长宁龙之梦旗舰店',
    photo,
    isCenter: false
  },
  {
    title: '陆家嘴国金中心店',
    photo,
    isCenter: false
  },
  {
    title: '新天地概念体验店',
    photo,
    isCenter: false
  }
]
export default class PlanSelection extends PureComponent {
  constructor() {
    super()
    this.state = {
      isActive: 3
    }
  }
  activeHandle = (index) => {
    console.log(index)
    console.log(this.state)
    this.setState({
      isActive: index
    })
  }

  componentDidMount() {}

  render() {
    const { isActive } = this.state
    return (
      <View className='page-planSelection'>
        <View className='title'>选择您的店铺工作台</View>
        <View className='tips'>没有找到？请联系您的超级管理员</View>
        <View className='box'>
          <SpRadio
            isActive={isActive}
            SpRadioData={SpRadioData}
            activeHandle={this.activeHandle}
          ></SpRadio>
        </View>
        <View className='logoBox'>
          <Image src={logo}></Image>
        </View>
      </View>
    )
  }
}
