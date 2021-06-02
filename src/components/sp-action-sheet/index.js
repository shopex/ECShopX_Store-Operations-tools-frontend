import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components'
import React, { PureComponent } from 'react'
import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import './index.scss'

class SpActionSheet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selector: ['美国', '中国', '巴西', '日本']
    }
  }

  handleChangePicker = (e) => {
    console.log('handleChangePicker', e.detail)
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

    const { selector } = this.state

    // if(type==='picker'){
    //     return <Picker  mode='selector' range={selector} onChange={this.handleChangePicker} className={classNames('sp-action-sheet', className)}>
    //         {children}
    //     </Picker>
    // }

    return (
      <AtFloatLayout
        isOpened={visible}
        onClose={onClose}
        className={classNames('sp-action-sheet', className)}
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
          {/* {children} */}
          <PickerView>
            <PickerViewColumn>
              {selector.map((s) => (
                <Text>{s}</Text>
              ))}
            </PickerViewColumn>
          </PickerView>
        </View>
      </AtFloatLayout>
    )
  }
}

export default SpActionSheet
