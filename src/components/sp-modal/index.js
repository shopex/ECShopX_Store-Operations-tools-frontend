import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { View, Text, ScrollView, Button, Image } from '@tarojs/components'
import { SpRadio } from '@/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss'

const flag = {
  success: {
    img: require('@/assets/imgs/index/success.png'),
    text: '兑换券订单核销成功'
  },
  fail: {
    img: require('@/assets/imgs/index/fail.png'),
    text: '兑换券订单核销失败',
    tips: '请通知客户去活动范围内的店铺进行兑换！'
  }
}
export default class MessageDetail extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    console.log(this.props)
    const { visible, status, handleCancel } = this.props
    return (
      <View className='cpn-modal'>
        {visible && (
          <AtModal isOpened={visible}>
            <AtModalHeader className='header'>
              <View className='imgBox'>
                <Image className='img' src={flag[status].img}></Image>
              </View>
              <View className='text'>
                {flag[status].text}
                {status == 'fail' && <View className='tips'>{flag[status].tips || 1222}</View>}
              </View>
            </AtModalHeader>
            <AtModalContent className='content'>
              <View className='list'>
                <View className='nav'>
                  <Image className='img' src={require('@/assets/imgs/index/book.png')}></Image>
                  <View className='detail'>
                    {status == 'success' ? (
                      <View className='successBox'>
                        <View className='imgBox'>
                          <Image className='img' src={require('../../assets/imgs/1.jpg')}></Image>
                        </View>
                        <View className='title'>
                          我是一段倒奶事件哎肯定奶萨尽可能大神金口难开的那家电脑卡凯
                        </View>
                        <View className='type'>规格</View>
                        <View className='num type'>数量：1</View>
                      </View>
                    ) : (
                      <View className='failBox'>
                        <View className='title'>推荐可选门店：</View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </AtModalContent>
            <AtModalAction className='bottom'>
              <Button onclick={() => handleCancel(false)}>关闭</Button>
              {status == 'success' && <Button className='btn'>查看详情</Button>}
            </AtModalAction>
          </AtModal>
        )}
      </View>
    )
  }
}
