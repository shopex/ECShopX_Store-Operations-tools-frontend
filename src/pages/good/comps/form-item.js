import React, { useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { SpTab, SpGoodPrice } from '@/components'
import { SelectInput, Tabbar, PageActionButtons } from '@/components/sp-page-components'
import { getThemeStyle, classNames } from '@/utils'
import { useImmer } from 'use-immer'
import { AtInput } from 'taro-ui'
import './form-item.scss'

const initState = {
  value: ''
}

const FormItem = (props) => {
  const {
    label,
    required = false,
    mode = 'input',
    placeholder,
    onClick = () => {},
    value: valueProp,
    onChange: onChangeProp = () => {}
  } = props

  const isSelector = mode == 'selector'

  const [state, setState] = useImmer(initState)

  const { value } = state

  useEffect(() => {
    if (valueProp) {
      setState((_val) => {
        _val.value = valueProp
      })
    }
  }, [valueProp])

  return (
    <View className='form-item'>
      {required && <View className='form-item-required'>*</View>}
      <View className='form-item-label'>{label}</View>
      <View className='form-item-main' onClick={onClick}>
        <AtInput
          editable={!isSelector}
          className='input'
          placeholder={placeholder}
          value={value}
          onChange={onChangeProp}
        />

        <View
          className={classNames('form-item-main-action', {
            hasArrow: isSelector
          })}
        >
          <View className='iconfont icon-jiantou'></View>
        </View>
      </View>
    </View>
  )
}

export default FormItem
