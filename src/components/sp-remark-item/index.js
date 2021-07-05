import { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import { SpFormItem } from '@/components'
import { classNames } from '@/utils'
import './index.scss'

export default class SpRemarkItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {} = this.props
    return (
      <View className={classNames('sp-component-remark-item', 'box-shadow-common')}>
        <SpFormItem label='商家备注' labelbold>
          <View>添加</View>
        </SpFormItem>
      </View>
    )
  }
}
