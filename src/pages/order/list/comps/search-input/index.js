import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { classNames } from '@/utils'
import './index.scss'

export default class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { modalShow, clickSearch = () => {} } = this.props

    return (
      <View className='comp-order-list-searhInput'>
        <View className='title' id='custom_input' onClick={clickSearch}>
          <Text id='custom_input_text'>订单号</Text>
          <Text
            className={classNames('iconfont', 'icon-xiala-01', {
              ['isModalShow']: modalShow
            })}
            id='custom_input_arrow'
          ></Text>
        </View>
        <View className='input'>
          <AtInput className='at-input' placeholder='请输入想要搜索的内容' border={false} />
        </View>
      </View>
    )
  }
}
