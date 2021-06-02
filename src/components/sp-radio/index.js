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
    console.log(SpRadioData)
    return (
      <View>
        {SpRadioData.map((item, index) => {
          return (
            <View key={item.title} className='cpn-radio' onClick={(e) => activeHandle(index + 1)}>
              <View className='radio'>
                <View className='part1'>
                  <View className='logo'>
                    <Image src={item.photo}></Image>
                  </View>
                  <View className='content'>
                    <View className='title'>{item.title}</View>
                    {item.isCenter && (
                      <View className='tag'>
                        <AtTag size='small' type='primary'>
                          总部
                        </AtTag>
                      </View>
                    )}
                  </View>
                </View>
                {index + 1 === isActive && (
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
  }
}
