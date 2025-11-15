// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { classNames } from '@/utils'

import './index.scss'

export default class NoteIndex extends PureComponent {
  static options = {
    addGlobalClass: true
  }

  resolveUrl(img) {
    return require(`@/assets/imgs/${img}`)
  }

  render() {
    const { img, imgStyle, styles, className, imageType } = this.props

    return (
      <View
        className={classNames('note', img ? 'note__has-img' : null, className)}
        // style={styleNames(styles)}
      >
        {img && (
          <Image
            className='note__img'
            mode='aspectFit'
            // style={styleNames(imgStyle)}
            src={this.resolveUrl(img)}
          />
        )}
        <Text className='note__text'>{this.props.children}</Text>
      </View>
    )
  }
}
