import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { classNames } from '@/utils'
import { FieldSelect } from '@/components/sp-page-components'
import './index.scss'
import { ORDER_LIST_FIELDS } from '@/consts'

const getListAboutPage = (pageType) => {
  let returnArr = []
  if (pageType === 'orderList') {
    returnArr = Object.keys(ORDER_LIST_FIELDS).map((key) => ({
      value: key,
      label: ORDER_LIST_FIELDS[key]
    }))
  }
  return returnArr
}

class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false
    }
  }

  //点击筛选modal框其他地方
  handleFilterModalClickAway = (e) => {
    if (
      e.target.id === 'custom_input' ||
      e.target.id === 'custom_input_arrow' ||
      e.target.id === 'custom_input_text'
    ) {
      return
    }
    this.setState({
      modalShow: false
    })
  }

  //点击search事件
  clickSearch = () => {}

  render() {
    const { modalShow } = this.state

    const { inputParams, inputValue, pageType } = this.props

    const dataSource = getListAboutPage(pageType)

    return (
      <View className='sp-page-search-input'>
        <View className='title' id='custom_input' onClick={this.clickSearch}>
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

        <FieldSelect
          dataSource={dataSource}
          visible={modalShow}
          onClickAway={this.handleFilterModalClickAway}
        />
      </View>
    )
  }
}

export default SearchInput
