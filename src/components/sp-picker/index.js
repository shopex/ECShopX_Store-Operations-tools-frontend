import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import './index.scss'

class SpPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
    }
  }

  render() {
    const {
      visible,
      onClose = () => {},
      title = '操作弹框',
      onCancelText = '取消',
      onConfirmText = '确定',
      onConfirm = () => {},
      onCancel = () => {},
      children,
      className,
      type = 'normal'
    } = this.props

    const { columns } = this.state

    return (
      <AtFloatLayout
        isOpened={visible}
        onClose={onClose}
        className={classNames('sp-component-picker', className)}
      >
        <View className='header'>
          <View className='left' onClick={onCancel}>
            {onCancelText}
          </View>
          <View className='center'>{title}</View>
          <View className='right' onClick={onConfirm}>
            {onConfirmText}
          </View>
        </View>
        <View className='content'>
          <View className='columns'>
            <View className='columns'>
              <View className='column_wrapper'>
                {columns.map((c) => (
                  <View className={classNames('columns_item')}>{c}</View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </AtFloatLayout>
    )
  }
}

export default SpPicker
