import React, { PureComponent } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import { ORDER_STATUS } from '@/consts'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'

export default class Tabbar extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { activeStatus, onTabClick = () => {} } = this.props

    return (
      <AtTabs
        current={activeStatus}
        scroll
        tabList={[
          { title: '标签页1' },
          { title: '标签页2' },
          { title: '标签页3' },
          { title: '标签页4' },
          { title: '标签页5' },
          { title: '标签页6' }
        ]}
        onClick={onTabClick}
      ></AtTabs>
    )
  }
}
