import React, { PureComponent } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import { ORDER_STATUS } from '@/consts'
import { classNames } from '@/utils'
import './index.scss'

export default class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { activeStatus } = this.props

    return (
      <ScrollView scrollX className='comp-order-list-tabbar'>
        {Object.keys(ORDER_STATUS).map((statusValue) => (
          <View
            key={statusValue}
            className={classNames('comp-order-list-tabbar-item', {
              ['active']: activeStatus == statusValue
            })}
          >
            <Text>{ORDER_STATUS[statusValue]}</Text>
          </View>
        ))}
      </ScrollView>
    )
  }
}
