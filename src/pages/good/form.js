import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { SpMultilevelPicker } from '@/components'
import { SelectInput, CommonButton } from '@/components/sp-page-components'
import { getThemeStyle, pickBy } from '@/utils'
import { useImmer } from 'use-immer'
import api from '@/api'
import { FormItem } from './comps'
import { transformData } from './util'
import { MAIN_CATEGORY, TITLE, SUB_TITLE } from './const'
import './form.scss'

const initState = {
  mainCategoryVisible: false,
  mainCategory: {},
  title: '',
  sub_title: ''
}

const initData = {
  mainCategoryList: []
}

const Detail = () => {
  const [state, setState] = useImmer(initState)

  const [fetchData, setFetchData] = useImmer(initData)

  const getMainCategory = async () => {
    const category_data = await api.weapp.category()

    await setFetchData((_val) => {
      _val.mainCategoryList = transformData(category_data, {
        category_name: 'label',
        category_id: 'value',
        id: 'id'
      })
    })
  }

  useEffect(() => {
    getMainCategory()
  }, [])

  const handleClickFormItem = (key) => () => {
    switch (key) {
      case MAIN_CATEGORY:
        setState((val) => {
          val.mainCategoryVisible = true
        })
        break
    }
  }

  const handleChangeForm = (key) => (item) => {
    console.log('===handleChangeForm==', item)
    switch (key) {
      case MAIN_CATEGORY:
        setState((_val) => {
          _val.mainCategory = item
          _val.mainCategoryVisible = false
        })
        break
      case TITLE:
        setState((_val) => {
          _val.title = item
        })
        break
      case SUB_TITLE:
        setState((_val) => {
          _val.sub_title = item
        })
        break
    }
  }

  const { mainCategoryList } = fetchData

  const { mainCategoryVisible, mainCategory, title, sub_title } = state

  return (
    <View className='page-good-detail' style={getThemeStyle()}>
      <View className='page-good-detail-scrolllist'>
        <FormItem
          name={MAIN_CATEGORY}
          label='商品主分类'
          required
          mode='selector'
          placeholder='请选择商品主类目'
          onClick={handleClickFormItem(MAIN_CATEGORY)}
          value={mainCategory.label}
        />
        <FormItem
          name={TITLE}
          label='商品标题'
          required
          mode='input'
          placeholder='请输入商品标题'
          onChange={handleChangeForm(TITLE)}
          value={title}
        />
        <FormItem
          name={SUB_TITLE}
          label='商品副标题'
          mode='input'
          placeholder='请输入商品副标题'
          onChange={handleChangeForm(SUB_TITLE)}
          value={sub_title}
        />
      </View>
      <View className='page-good-detail-button'>
        <CommonButton text='提交' type='primary' />
      </View>

      <SpMultilevelPicker
        visible={mainCategoryVisible}
        title='选择主类目'
        dataSource={mainCategoryList}
        onChange={handleChangeForm(MAIN_CATEGORY)}
        onClose={() =>
          setState((_val) => {
            _val.mainCategoryVisible = false
          })
        }
      />
    </View>
  )
}

export default Detail
