import { PureComponent } from 'react'
import { View, Image, Text } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'

export default class ChangeWL extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      showEdit: false
    }
  }
  editBtnHandle() {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  render() {
    const { showEdit } = this.state
    const { barList } = this.props
    return (
      <View className='cpn-spChangeWL'>
        <View className='bar'>
          <View className='title'>物流公司</View>
          <View className='content'>
            {showEdit ? (
              <Text className='iconfont icon-queren update' onClick={this.editBtnHandle.bind(this)}>
                {' '}
                确认修改
              </Text>
            ) : (
              <View className='iconfont icon-xiugai update' onClick={this.editBtnHandle.bind(this)}>
                {' '}
                修改物流
              </View>
            )}
          </View>
        </View>
        {barList.map((item) => {
          return (
            <View className='list'>
              <View className='title'>{item.title}</View>
              <View className='content'>
                <Text className='value'>{item.value} </Text>
                {showEdit && <Text className='edit'> 编辑</Text>}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
