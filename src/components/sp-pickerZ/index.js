import { PureComponent } from 'react'
import { View, Image, Text, Picker } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtList, AtListItem } from 'taro-ui'

export default class ChangeWL extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selector: ['美国', '中国', '巴西', '日本'],
      selectorChecked: '美国',
      timeSel: '12:01',
      dateSel: '2018-04-22'
    }
  }

  render() {
    return (
      <View className='cpn-picker'>
        <View className='cover'>
          <View className='bar'>
            <View className='left'>取消</View>
            <View className='center'>选择快递公司</View>
            <View className='right'>确定</View>
          </View>
          <View className='content'>
            <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
              <AtList>
                <AtListItem title='国家地区' extraText={this.state.selectorChecked} />
              </AtList>
            </Picker>
            <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
              <View className='picker'>当前选择：{this.state.selectorChecked}</View>
            </Picker>
          </View>
        </View>
      </View>
    )
  }
}
