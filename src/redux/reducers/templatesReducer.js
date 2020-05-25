import { GRPC, TEMPLATES } from '../actions/actionNames'

const initialState = {
  cells: [
    {
      title: 'Артикул',
      name: 'itemNum',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 100,
      style: {},
    },
    {
      title: 'Изображение',
      name: 'image',
      type: 'image',
      required: true,
      default: '',
      style: {},
    },
    {
      title: 'Размер',
      name: 'size',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 100,
      style: {},
    },
    {
      title: 'Кол-во',
      name: 'count',
      type: 'number',
      required: true,
      default: 0,
      min: 1,
      max: 10000,
      style: {},
    },
    {
      title: 'Масса',
      name: 'weight',
      type: 'float',
      required: true,
      default: 0,
      min: 0.001,
      max: 10000,
      style: {},
      output: (float) => Math.round(parseFloat(float) * 1000) / 1000,
    },
    {
      title: 'Примечание',
      name: 'description',
      type: 'string',
      required: false,
      default: '',
      minLength: 0,
      maxLength: 256,
      style: { fontSize: 12, maxWidth: 200 },
    },
  ],
  vendors: [],
  vendorPageShowAddVendor: false,
  currentVendorId: null,
  itemsOfCurrentVendor: [],
  categories: [],
  newCategory: {},
  itemPageShowCategoryCreate: false,
  itemPageShowCategorySelect: false,
}

const obj = {
  [GRPC.TEMPLATES.VENDORS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    vendors: data,
  }),
  [GRPC.TEMPLATES.VENDORS.CREATE.SUCCESS]: (state) => ({
    ...state,
    vendorPageShowAddVendor: false,
  }),
  [GRPC.TEMPLATES.CATEGORIES.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    categories: data,
  }),
  [GRPC.TEMPLATES.CATEGORIES.CREATE.SUCCESS]: (state, { data }) => ({
    ...state,
    newCategory: data || {},
  }),
  [GRPC.TEMPLATES.ITEMS.GET_BY_VENDOR.SUCCESS]: (state, action) => {
    const newCategory = !!action.data.find(
      (item) =>
        item.category === state.newCategory.category ||
        item.categoryId === state.newCategory.categoryId,
    )
      ? {}
      : state.newCategory.categoryId
    return {
      ...state,
      itemsOfCurrentVendor: action.data,
      newCategory: newCategory || {},
    }
  },
  [GRPC.TEMPLATES.ITEMS.GET_BY_CATEGORY.SUCCESS]: (state) => state,
  [GRPC.TEMPLATES.ITEMS.CREATE.SUCCESS]: (state) => state,
  [GRPC.TEMPLATES.ITEMS.ADD_TO_VENDOR]: (state) => state,
  [TEMPLATES.VENDOR_PAGE_SHOW_ADD_VENDOR]: (state) => ({
    ...state,
    vendorPageShowAddVendor: true,
  }),
  [TEMPLATES.VENDOR_PAGE_HIDE_ADD_VENDOR]: (state) => ({
    ...state,
    vendorPageShowAddVendor: false,
  }),
  [TEMPLATES.ITEM_PAGE_SET_CURRENT_VENDOR]: (state, action) => {
    const itemsOfCurrentVendor =
      +action.vendorId === state.currentVendorId
        ? state.itemsOfCurrentVendor
        : []
    return {
      ...state,
      currentVendorId: +action.vendorId,
      itemsOfCurrentVendor,
    }
  },
  [TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_CREATE]: (state) => ({
    ...state,
    itemPageShowCategoryCreate: true,
  }),
  [TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE]: (state) => ({
    ...state,
    itemPageShowCategoryCreate: false,
  }),
  [TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_SELECT]: (state) => ({
    ...state,
    itemPageShowCategorySelect: true,
  }),
  [TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT]: (state) => ({
    ...state,
    itemPageShowCategorySelect: false,
  }),
  [TEMPLATES.ITEM_PAGE_ADD_NEW_CATEGORY]: (state, action) => ({
    ...state,
    newCategory: action.category || {},
  }),
  [TEMPLATES.VENDOR_PAGE_CLEAR_ITEMS]: (state) => ({
    ...state,
    itemsOfCurrentVendor: [],
  }),
  DEFAULT: (state) => state,
}

export default (state = initialState, action) => {
  return obj[action.type] ? obj[action.type](state, action) : obj.DEFAULT(state)
}
