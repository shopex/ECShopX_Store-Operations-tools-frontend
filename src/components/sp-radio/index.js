import { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { AtTag } from 'taro-ui'

const duigou = require('@/assets/imgs/zyk-duigou.png')

export default class index extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { SpRadioData, isActive, activeHandle } = this.props
    return (
      SpRadioData && (
        <View>
          {SpRadioData.map((item, index) => {
            return (
              <View
                key={item.distributor_id}
                className='cpn-radio'
                onClick={(e) => activeHandle(item)}
              >
                <View className='radio'>
                  <View className='part1'>
                    <View className='logo'>
                      <Image src={item.logo}></Image>
                    </View>
                    <View className='content'>
                      <View className='title'>{item.name}</View>
                      {item.is_center && (
                        <View className='tag'>
                          <AtTag size='small' type='primary'>
                            总部
                          </AtTag>
                        </View>
                      )}
                    </View>
                  </View>
                  {item.distributor_id === isActive && (
                    <View className='active'>
                      <Image src={duigou}></Image>
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>
      )
    )
  }
}
