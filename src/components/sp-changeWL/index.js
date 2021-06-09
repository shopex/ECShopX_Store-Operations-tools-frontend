import { PureComponent } from 'react'
import { View, Image, Text, Picker } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'

export default class ChangeWL extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      showEdit: false
    }
  }
  editBtnHandle() {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  formatOptions(options) {
    let arr = []
    options.map((item) => {
      arr.push(item.name)
    })
    return arr
  }

  render() {
    const { showEdit } = this.state
    const { barList, editItemHandle, CourierCompany, changeHandle, delivery_list } = this.props
    return (
      <>
        {delivery_list &&
          delivery_list.map((item) => {
            return (
              <View className='cpn-spChangeWL' key={item.order_id}>
                <View className='bar'>
                  <View className='title'>物流公司</View>
                  <View className='content'>
                    {showEdit ? (
                      <Text
                        className='iconfont icon-queren update'
                        onClick={this.editBtnHandle.bind(this)}
                      >
                        {' '}
                        确认修改
                      </Text>
                    ) : (
                      <View
                        className='iconfont icon-xiugai update'
                        onClick={this.editBtnHandle.bind(this)}
                      >
                        {' '}
                        修改物流
                      </View>
                    )}
                  </View>
                </View>
                <View className='list'>
                  <View className='title'>快递公司</View>
                  <View className='content'>
                    <Text className='value'>{item.delivery_corp_name} </Text>
                    {showEdit && (
                      <Picker
                        value=''
                        onChange={changeHandle}
                        range={CourierCompany}
                        rangeKey='name'
                        className='picker'
                        mode='selector'
                      >
                        <Text
                          className='edit'
                          // onClick={(e) => {
                          //   editItemHandle(item.title)
                          // }}
                        >
                          {' '}
                          编辑
                        </Text>
                      </Picker>
                    )}
                  </View>
                </View>
                <View className='list'>
                  <View className='title'>物流单号</View>
                  <View className='content'>
                    <Text className='value'>{item.order_id} </Text>
                    {showEdit && (
                      <Text
                        className='edit'
                        onClick={(e) => {
                          editItemHandle(item.title)
                        }}
                      >
                        {' '}
                        编辑
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )
          })}
      </>
    )

    // <View className='cpn-spChangeWL'>
    //   <View className='bar'>
    //     <View className='title'>物流公司</View>
    //     <View className='content'>
    //       {showEdit ? (
    //         <Text className='iconfont icon-queren update' onClick={this.editBtnHandle.bind(this)}>
    //           {' '}
    //           确认修改
    //         </Text>
    //       ) : (
    //         <View className='iconfont icon-xiugai update' onClick={this.editBtnHandle.bind(this)}>
    //           {' '}
    //           修改物流
    //         </View>
    //       )}
    //     </View>
    //   </View>
    //   <View className='list'>
    //     <View className='title'>快递公司</View>
    //     <View className='content'>
    //       <Text className='value'>{111&&delivery_list.delivery_corp_name} </Text>
    //       {
    //          showEdit && <Picker value='' onChange={changeHandle} range={CourierCompany} rangeKey={'name'} className='picker' mode='selector'><Text className='edit' onClick={e=>{editItemHandle(item.title)}}> 编辑</Text></Picker>
    //       }
    //     </View>
    //   </View>
    //   <View className='list'>
    //     <View className='title'>物流单号</View>
    //     <View className='content'>
    //       <Text className='value'>{111&&delivery_list.order_id} </Text>
    //       {
    //         (showEdit && <Text className='edit' onClick={e=>{editItemHandle(item.title)}}> 编辑</Text>)
    //       }
    //     </View>
    //   </View>
    //   {/* {barList.map((item) => {
    //     return (

    //       <View className='list' key={item.title}>

    //         <View className='title'>{item.title}</View>

    //         <View className='content'>
    //           <Text className='value'>{delivery_list.delivery_corp_name} </Text>
    //           {
    //             item.title =='快递公司'?

    //             showEdit && <Picker value='' onChange={changeHandle} range={CourierCompany} rangeKey={'name'} className='picker' mode='selector'><Text className='edit' onClick={e=>{editItemHandle(item.title)}}> 编辑</Text></Picker>

    //             :
    //             (showEdit && <Text className='edit' onClick={e=>{editItemHandle(item.title)}}> 编辑</Text>)
    //           }

    //         </View>
    //       </View>
    //     )
    //   })} */}
    // </View>
  }
}
