import React, { useEffect } from 'react'
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { SpMultilevelPicker, SpPicker, SpToast } from '@/components'
import { CommonButton } from '@/components/sp-page-components'
import { getThemeStyle, transformData, showToast, requestCallback } from '@/utils'
import { useImmer } from 'use-immer'
import api from '@/api'
import { useSelector } from 'react-redux'
import { transformDetail } from './util'
import { FormItem, SpecItem, FormImageItem } from './comps'
import {
  STATUS_LIST,
  REQUIRE_VALUE,
  MAIN_CATEGORY,
  TITLE,
  SUB_TITLE,
  DETAIL,
  PIC,
  SPECS,
  CATEGORY,
  BRAND,
  TEMPLATE,
  CAT_MAP,
  BRAND_MAP,
  TEMPLATE_MAP,
  ITEM_SPECS
} from './const'
import './form.scss'

const initState = {
  mainCategoryVisible: false,
  mainCategory: {},
  categoryVisible: false,
  category: {},
  brandVisible: false,
  brand: {},
  template: {},
  templateVisible: false,
  item_name: '',
  brief: '',
  //已选择的规格
  selectSpec: [],
  //是否开启多规格
  openSpec: false,
  //图片
  pics: [],
  detail: [],
  custom_item_spec_desc: {},
  id: undefined
}

const initData = {
  mainCategoryList: [],
  categoryList: [],
  brandList: [],
  templateList: [],
  goodsSpec: []
}

const Detail = () => {
  const [state, setState] = useImmer(initState)

  const [fetchData, setFetchData] = useImmer(initData)

  const { mainCategoryList, categoryList, brandList, templateList, goodsSpec } = fetchData

  const {
    mainCategoryVisible,
    mainCategory,
    categoryVisible,
    category,
    brandVisible,
    brand,
    templateVisible,
    template,
    item_name,
    brief,
    selectSpec,
    openSpec,
    pics,
    detail,
    id
  } = state

  useDidShow(async () => {
    const {
      params: { id }
    } = getCurrentInstance().router
    // item_category_main_name:({item_category_main})=>item_category_main[0]?.children?.[0]?.children?.[0].category_name,
    // item_category_main_id:({item_category_main})=>item_category_main[0]?.children?.[0]?.children?.[0].id
    if (!id) return
    setState((_val) => {
      _val.id = id
    })
    const {
      item_category_main,
      item_name,
      brief,
      item_category_info,
      goods_brand,
      brand_id,
      nospec,
      templates_name,
      templates_id,
      pics,
      custom_item_spec_desc,
      spec_items,
      intro,
      price = 0,
      approve_status,
      store,
      item_bn
    } = await api.weapp.good_detail(id)
    const isMulti = nospec === false
    await setState((_val) => {
      _val.mainCategory = {
        id: item_category_main[0]?.children?.[0]?.children?.[0].id,
        label: item_category_main[0]?.children?.[0]?.children?.[0].category_name
      }
      _val.item_name = item_name
      _val.brief = brief
      _val.category = {
        id: item_category_info[0]?.children?.[0]?.children?.[0].id,
        label: item_category_info[0]?.children?.[0]?.children?.[0].category_name
      }
      _val.brand = {
        id: brand_id,
        label: goods_brand
      }
      _val.item_bn = item_bn
      _val.price = price / 100
      _val.template = {
        label: templates_name,
        id: templates_id
      }
      _val.openSpec = isMulti
      _val.pics = pics
      _val.custom_item_spec_desc = custom_item_spec_desc
      _val.selectSpec = isMulti
        ? spec_items.map((item) => ({
            ...item,
            price: item.price / 100,
            approve_status: {
              label: STATUS_LIST.find((_item) => _item.value === item.approve_status)?.label,
              value: item.approve_status
            },
            sku_id: item.custom_spec_id,
            sku_name: item.custom_spec_name
          }))
        : [
            {
              approve_status: {
                label: STATUS_LIST.find((_item) => _item.value === approve_status)?.label,
                value: approve_status
              },
              store,
              price: price / 100,
              item_bn: item_bn
            }
          ]
      _val.detail = intro
        .replace(/<img[^>]*src=['"]([^'"]+)[^>]*>/, (...args) => `${args[1]}==`)
        .split('==')
        .filter((item) => !!item)
    })
  })

  const {
    activeShop: { distributor_id }
  } = useSelector((state) => state.planSelection)

  const getMainCategory = async () => {
    const category_data = await api.weapp.main_category()

    await setFetchData((_val) => {
      _val.mainCategoryList = transformData(category_data, CAT_MAP)
    })
  }

  const getCategory = async () => {
    const category_data = await api.weapp.category({
      distributor_id
    })

    await setFetchData((_val) => {
      _val.categoryList = transformData(category_data, CAT_MAP)
    })
  }

  const getBrand = async () => {
    const { list } = await api.weapp.brand()
    await setFetchData((_val) => {
      _val.brandList = transformData(list, BRAND_MAP)
    })
  }

  const getTemplate = async () => {
    const { list } = await api.weapp.template()
    await setFetchData((_val) => {
      _val.templateList = transformData(list, TEMPLATE_MAP)
    })
  }

  const getMainCategoryDetail = async (id) => {
    const { goods_spec } = await api.weapp.main_category_detail(id)
    await setFetchData((_val) => {
      _val.goodsSpec = goods_spec
    })
  }

  useEffect(() => {
    getMainCategory()
    getCategory()
    getBrand()
    getTemplate()
  }, [])

  const handleClickFormItem = (key) => (item) => {
    switch (key) {
      case MAIN_CATEGORY:
        if (id) {
          showToast('商品主类目暂不支持修改！')
          break
        }

        setState((val) => {
          val.mainCategoryVisible = true
        })
        break
      case CATEGORY:
        if (categoryList.length == 0) {
          showToast('请在PC管理端添加分类！')
          break
        }
        setState((val) => {
          val.categoryVisible = true
        })
        break
      case BRAND:
        if (brandList.length == 0) {
          showToast('请在PC管理端添加品牌！')
          break
        }
        setState((val) => {
          val.brandVisible = true
        })
        break
      case TEMPLATE:
        if (templateList.length == 0) {
          showToast('请在PC管理端添加运费模板！')
          break
        }
        setState((val) => {
          val.templateVisible = true
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
      case CATEGORY:
        setState((_val) => {
          _val.category = item
          _val.categoryVisible = false
        })
        break
      case TITLE:
        setState((_val) => {
          _val.item_name = item
        })
        break
      case SUB_TITLE:
        setState((_val) => {
          _val.brief = item
        })
        break
      case BRAND:
        setState((_val) => {
          _val.brand = brandList[item]
          _val.brandVisible = false
        })
        break
      case TEMPLATE:
        setState((_val) => {
          _val.template = templateList[item]
          _val.templateVisible = false
        })
        break
      case SPECS:
        setState((_val) => {
          _val.openSpec = item
        })
        break
      case PIC:
        setState((val) => {
          val.pics = [...item]
        })
        break
      case DETAIL:
        setState((val) => {
          val.detail = [...item]
        })
        break
      case ITEM_SPECS:
        setState((val) => {
          val.selectSpec = [...item]
        })
        break
    }
  }

  useEffect(() => {
    if (mainCategory.id) {
      getMainCategoryDetail(mainCategory.id)
    }
  }, [mainCategory])

  //是否有多规格
  const hasGoodSpec = goodsSpec.length > 0

  const handleSubmit = async () => {
    console.log('==handleSubmit=')
    if (!mainCategory.id) {
      showToast('商品主类目必填')
      return
    }
    if (!item_name) {
      showToast('商品标题必填')
      return
    }
    if (!category.id) {
      showToast('商品分类必填')
      return
    }
    if (!brand.id) {
      showToast('商品品牌必填')
      return
    }
    if (!template.id) {
      showToast('商品运费模版必选')
      return
    }
    let currentSpecs = {}
    console.log('==', selectSpec)
    if (openSpec) {
      const isFull = selectSpec.every(
        (spec) => spec.approve_status.value && spec.price && spec.store
      )
      if (!isFull) {
        showToast('规格信息需填写完整！')
        return
      }
    } else {
      currentSpecs = { ...selectSpec[0] }
      if (!currentSpecs.approve_status.label) {
        showToast('商品售卖状态必选')
        return
      }
      if (!currentSpecs.store) {
        showToast('商品库存必填')
        return
      }
      if (!currentSpecs.price) {
        showToast('商品价格必填')
        return
      }
      currentSpecs.approve_status = currentSpecs.approve_status.value
    }
    if (pics.length === 0) {
      showToast('商品图片必填')
      return
    }
    requestCallback(
      async () => {
        let data = {}
        if (id) {
          data = await api.weapp.edit_good({
            ...(openSpec ? REQUIRE_VALUE : REQUIRE_VALUE),
            id,
            distributor_id,
            sort: 1,
            item_type: 'normal',
            special_type: 'normal',
            item_name,
            item_main_cat_id: mainCategory.id,
            brief,
            item_category: [category.id],
            brand_id: brand.id,
            templates_id: template.id,
            pics,
            intro: transformDetail(detail),
            spec_items: openSpec
              ? JSON.stringify(
                  selectSpec.map((item) => ({
                    ...REQUIRE_VALUE,
                    ...item,
                    approve_status: item.approve_status.value
                  }))
                )
              : undefined,
            nospec: openSpec ? false : true,
            ...currentSpecs
          })
        } else {
          data = await api.weapp.good({
            ...(openSpec ? REQUIRE_VALUE : REQUIRE_VALUE),
            distributor_id,
            sort: 1,
            item_type: 'normal',
            special_type: 'normal',
            item_name,
            item_main_cat_id: mainCategory.id,
            brief,
            item_category: [category.id],
            brand_id: brand.id,
            templates_id: template.id,
            pics,
            intro: transformDetail(detail),
            spec_items: openSpec
              ? JSON.stringify(
                  selectSpec.map((item) => ({
                    ...REQUIRE_VALUE,
                    ...item,
                    approve_status: item.approve_status.value
                  }))
                )
              : undefined,
            nospec: openSpec ? false : true,
            ...currentSpecs
          })
        }
        return data
      },
      id ? '编辑商品成功' : '添加商品成功',
      () => {
        setTimeout(() => {
          Taro.navigateBack()
        }, 100)
      }
    )
  }

  return (
    <View className='page-good-detail' style={getThemeStyle()}>
      <View className='page-good-detail-scrolllist'>
        <View className='top-block'>
          <FormItem
            label='商品主类目'
            required
            mode='selector'
            placeholder='请选择商品主类目'
            onClick={handleClickFormItem(MAIN_CATEGORY)}
            value={mainCategory.label}
            editable={id ? false : undefined}
          />
          <FormItem
            label='商品标题'
            required
            mode='input'
            placeholder='请输入商品标题'
            onChange={handleChangeForm(TITLE)}
            value={item_name}
          />
          <FormItem
            label='商品副标题'
            mode='input'
            placeholder='请输入商品副标题'
            onChange={handleChangeForm(SUB_TITLE)}
            value={brief}
          />
          <FormItem
            name={CATEGORY}
            label='商品分类'
            required
            mode='selector'
            placeholder='请选择商品分类'
            onClick={handleClickFormItem(CATEGORY)}
            value={category.label}
          />
          <FormItem
            label='商品品牌'
            required
            mode='selector'
            placeholder='请选择商品品牌'
            onClick={handleClickFormItem(BRAND)}
            value={brand.label}
          />
          <FormItem
            label='运费模版'
            required
            mode='selector'
            placeholder='请选择运费模版'
            onClick={handleClickFormItem(TEMPLATE)}
            value={template.label}
          />
          {hasGoodSpec && !id && (
            <FormItem
              label='商品规格'
              mode='switch'
              placeholder='开启多规格'
              onChange={handleChangeForm(SPECS)}
              value={openSpec}
            />
          )}
        </View>

        <SpecItem
          goodsSpec={goodsSpec}
          openSpec={openSpec}
          onChange={handleChangeForm(ITEM_SPECS)}
          value={selectSpec}
          id={id}
        />

        <View className='bottom-block'>
          <FormImageItem
            label='商品图片'
            desc='(最多上传9张图片，文件格式为bmp、png、jpeg、jpg或gif，建议尺寸：500*500px，不超过2M）'
            required
            placeholder='请选择商品图片'
            onChange={handleChangeForm(PIC)}
            value={pics}
          />
          <FormImageItem
            label='商品详情'
            desc='(文件格式为bmp、png、jpeg或jpg，建议尺寸：750*750px，不超过2M'
            placeholder='请选择商品详情'
            onChange={handleChangeForm(DETAIL)}
            value={detail}
          />
        </View>
      </View>
      <View className='page-good-detail-button'>
        <CommonButton text='提交' type='primary' onClick={handleSubmit} />
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

      <SpMultilevelPicker
        visible={categoryVisible}
        title='选择分类'
        dataSource={categoryList}
        onChange={handleChangeForm(CATEGORY)}
        onClose={() =>
          setState((_val) => {
            _val.categoryVisible = false
          })
        }
      />

      <SpPicker
        visible={brandVisible}
        title='选择品牌'
        columns={brandList.map((item) => item.label)}
        onCancel={() =>
          setState((_val) => {
            _val.brandVisible = false
          })
        }
        onClose={() =>
          setState((_val) => {
            _val.brandVisible = false
          })
        }
        onConfirm={handleChangeForm(BRAND)}
      />

      <SpPicker
        visible={templateVisible}
        title='选择运费模版'
        columns={templateList.map((item) => item.label)}
        onCancel={() =>
          setState((_val) => {
            _val.templateVisible = false
          })
        }
        onClose={() =>
          setState((_val) => {
            _val.templateVisible = false
          })
        }
        onConfirm={handleChangeForm(TEMPLATE)}
      />

      <SpToast />
    </View>
  )
}

export default Detail
