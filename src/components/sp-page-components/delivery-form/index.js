import React, { useEffect, useImperativeHandle } from 'react'
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { useImmer } from 'use-immer'
import { View, Text } from '@tarojs/components'
import api from '@/api'
import { classNames } from '@/utils'
import './index.scss'

const initState = {}
function DeliveryForm(props, ref) {
  const [state, setState] = useImmer(initState)

  const {} = state

  const { selfDeliveryForm } = props

  useEffect(() => {
    console.log('----', info)
  }, [])

  const handleFormItemClick = async (key) => {
    console.log(key)
    switch (key) {
      case 'delivery_corp':
        this.setState({
          deliveryVisible: true
        })
        break
      case 'self_delivery_operator_id':
        const { list } = await api.order.getDeliveryList()
        this.setState({
          opreaterVis: true,
          opreatorList: list
        })
        break
      case 'self_delivery_status':
        this.setState({
          deliveryStatusVis: true
        })
    }
  }

  return (
    <View className='delivery-form'>
      <FormItem
        label='快递公司'
        mode='selector'
        required
        placeholder='请输入快递公司'
        onClick={handleFormItemClick('delivery_corp')}
        value={selfDeliveryForm?.delivery_corp?.label}
      />
      {selfDeliveryForm?.delivery_corp?.value != 'SELF_DELIVERY' && (
        <FormItem
          label='物流单号'
          mode='input'
          required
          placeholder='请输入物流单号'
          onChange={(value) => this.handleChangeForm('delivery_code', value)}
          value={selfDeliveryForm.delivery_code}
        />
      )}

      {selfDeliveryForm?.delivery_corp?.value == 'SELF_DELIVERY' && (
        <>
          <FormItem
            label='配送员'
            required
            mode='selector'
            placeholder='请选择配送员'
            onClick={handleFormItemClick('self_delivery_operator_id')}
            value={selfDeliveryForm.self_delivery_operator_id?.username}
          />
          <FormItem
            label='配送编号'
            mode='input'
            editable={false}
            placeholder=''
            value={selfDeliveryForm.self_delivery_operator_id?.staff_no}
          />
          <FormItem
            label='配送员手机号'
            mode='input'
            editable={false}
            placeholder=''
            value={selfDeliveryForm.self_delivery_operator_id?.mobile}
          />
          <FormItem
            label='配送状态'
            required
            mode='selector'
            placeholder='请输入配送员状态'
            onClick={handleFormItemClick('self_delivery_status')}
            value={selfDeliveryForm.self_delivery_status?.label}
          />
          <FormItem
            label='配送备注'
            mode='input'
            placeholder='请输入配送员备注'
            onChange={(value) => this.handleChangeForm('delivery_remark', value)}
            value={selfDeliveryForm.delivery_remark}
          />
          <FormImageItem
            label='照片上传'
            desc='(最多上传9张图片，文件格式为bmp、png、jpeg、jpg或gif，建议尺寸：500*500px，不超过2M）'
            placeholder='请选择商品图片'
            onChange={(value) => this.handleChangeForm('delivery_pics', value)}
            value={selfDeliveryForm?.delivery_pics}
          />
        </>
      )}
    </View>
  )
}

export default DeliveryForm
