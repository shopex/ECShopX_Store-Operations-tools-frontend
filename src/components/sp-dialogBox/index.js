import { PureComponent } from 'react'
import { View, Image, Text } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtTextarea } from 'taro-ui'

export default class ChangeWL extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    const { rightClickHandle, handleClose, title, changeHandle, value } = this.props
    return (
      <View className='cpn-dialogBox'>
        <View className='cover'>
          <View className='bar'>
            <View className='left' onClick={handleClose}>
              取消
            </View>
            <View className='center'>{title}</View>
            <View className='right' onClick={rightClickHandle}>
              确定
            </View>
          </View>
          <View className='content'>
            <AtTextarea
              count={false}
              height={550}
              value={value}
              onChange={changeHandle}
              placeholder='请填写有效的物流单号'
            />
          </View>
        </View>
      </View>
    )
  }
}
