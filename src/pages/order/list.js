import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import SearchInput from './comps/search-input'
import Tabbar from './comps/tabbar'
import './list.scss'

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className='page-order-list'>
        <View className='page-order-list-input'>
          <SearchInput />
        </View>
        <Tabbar />
      </View>
    )
  }
}
