import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { PureComponent } from 'react'
import './index.scss'
import { View } from '@tarojs/components'
import { AtFloatLayout, AtTextarea } from 'taro-ui'
import { requestCallback } from '@/utils'
import api from '@/api'

export default class NoteDrawer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      noteContent: ''
    }
  }

  handleChangeNote = (value) => {
    this.setState({
      noteContent: value
    })
  }

  handleClose = (e) => {
    const { onClose } = this.props
    this.setState({
      noteContent: ''
    })
    onClose && onClose()
  }

  async handleConfirm(e) {
    const { onClose, currentOrder } = this.props
    const { noteContent } = this.state

    requestCallback(
      async () => {
        const data = await api.order.remarks({
          orderId: currentOrder.order_id,
          remark: noteContent,
          is_distribution: '1'
        })
        return data
      },
      '修改备注成功',
      () => {
        this.setState({
          noteContent: ''
        })
        onClose && onClose()
      }
    )
  }

  render() {
    const { visible, onClose } = this.props

    const { noteContent } = this.state

    return (
      <AtFloatLayout isOpened={visible} onClose={onClose} className='note-drawer'>
        <View className='header'>
          <View className='left' onClick={this.handleClose}>
            取消
          </View>
          <View className='center'>订单备注</View>
          <View className='right' onClick={this.handleConfirm.bind(this)}>
            确定
          </View>
        </View>
        <View className='content'>
          <AtTextarea
            count
            value={noteContent}
            onChange={this.handleChangeNote}
            maxLength={150}
            placeholder='请输入你的备注...'
          />
        </View>
      </AtFloatLayout>
    )
  }
}
