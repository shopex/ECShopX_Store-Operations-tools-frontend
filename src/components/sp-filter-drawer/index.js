import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { SpFilterButton } from '@/components'
import { ScrollButton } from '@/components/sp-page-components'
import { AtDrawer } from 'taro-ui'
import './index.scss'

class SpFilterDrawer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: {}
    }
  }

  handleClickBlock = (value, parentValue) => {
    this.setState({
      query: {
        ...this.state.query,
        [parentValue]: value
      }
    })
  }

  handleReset = () => {
    this.setState({
      query: {}
    })
  }

  handleConfirm = () => {
    const { onConfirm } = this.props
    onConfirm(this.state.query)
  }

  render() {
    const { visible, onCloseDrawer = () => {}, filterData = [], filterTitle } = this.props

    const { query } = this.state

    return (
      <AtDrawer
        show={visible}
        mask
        onClose={onCloseDrawer}
        right
        width='85%'
        className='sp-filter-drawer'
      >
        <View className='content'>
          <View className='filterTitle'>
            <Text className='text'>{filterTitle}</Text>
          </View>
          <View className='main'>
            {filterData.map((item, index) => {
              return (
                <View className='filterItem' key={item.itemValue}>
                  <View className='title'>{item.itemLabel}</View>
                  <SpFilterButton
                    filterItems={item.dataSource}
                    currentSelectValue={query[item.itemValue]}
                    onClickBlock={(value) => this.handleClickBlock(value, item.itemValue)}
                  />
                </View>
              )
            })}
          </View>
          <View className='footer'>
            <ScrollButton
              refuseText='重置'
              confirmText='确定并筛选'
              onReset={this.handleReset}
              onConfirm={this.handleConfirm}
            />
          </View>
        </View>
      </AtDrawer>
    )
  }
}

export default SpFilterDrawer
