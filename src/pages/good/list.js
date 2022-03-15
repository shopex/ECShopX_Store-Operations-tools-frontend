import React from 'react'
import { View } from '@tarojs/components'
import { SpTab } from '@/components'
import { SelectInput, CommonButton } from '@/components/sp-page-components'
import { getThemeStyle } from '@/utils'
import { navigateToGoodForm } from './util'
import { useImmer } from 'use-immer'
import { Item as GoodItem } from './comps'
import './list.scss'

//页面类型
const PAGE_TYPE = 'goodList'

const TAB_LIST = [
  { value: 'mendian', label: '门店商品' },
  { value: 'pingtai', label: '平台商品' }
]

const ACTION_LIST = [{ label: '编辑', plain: true }, { label: '上架' }]

const initState = {
  //搜索框选择的参数  类型为对象
  inputParams: null,
  //搜索框输入的值
  inputValue: ''
}

const List = () => {
  const [state, setState] = useImmer(initState)

  const handleParamChange = (inputParams) => {
    setState((_val) => {
      _val.inputParams = { ...inputParams }
    })
  }

  const handleValueChange = (inputValue) => {
    setState((_val) => {
      _val.inputValue = inputValue
    })
  }

  const handleSearchFilter = () => {}

  const { inputParams, inputValue } = state

  return (
    <View className='page-good-list' style={getThemeStyle()}>
      <View className='page-good-list-input'>
        <SelectInput
          inputParam={inputParams}
          inputValue={inputValue}
          pageType={PAGE_TYPE}
          paramChange={handleParamChange}
          valueChange={handleValueChange}
          onInputConfirm={handleSearchFilter}
        />
      </View>
      <View className='page-good-list-tab'>
        <SpTab dataSource={TAB_LIST} />
      </View>
      <View className='page-good-list-list'>
        <GoodItem>
          {ACTION_LIST.map((item, index) => {
            return (
              <CommonButton
                text={item.label}
                size='small'
                type='primary'
                plain={item.plain}
                key={index}
                className='common-button'
              />
            )
          })}
        </GoodItem>
      </View>
      <View className='page-good-list-addbutton'>
        <View className='iconfont icon-tianjia'></View>
        <View className='text' onClick={navigateToGoodForm}>
          添加商品
        </View>
      </View>
    </View>
  )
}

export default List
