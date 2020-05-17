import { GRPC, TEMPLATES } from '../actions/actionNames'

const initialState = {
  cells: [
    {
      title: 'Место',
      name: 'lot',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 10,
    },
    {
      title: 'Артикул',
      name: 'itemNum',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 10,
    },
    {
      title: 'Изображение',
      name: 'image',
      type: 'image',
      required: true,
      default: '',
    },
    {
      title: 'Размер',
      name: 'size',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 10,
    },
    {
      title: 'Кол-во',
      name: 'count',
      type: 'number',
      required: true,
      default: 0,
      min: 1,
      max: 10000,
    },
    {
      title: 'Масса',
      name: 'weight',
      type: 'float',
      required: true,
      default: 0,
      min: 0.001,
      max: 10000,
    },
    {
      title: 'Примечание',
      name: 'description',
      type: 'string',
      required: false,
      default: '',
      minLength: 0,
      maxLength: 10,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case GRPC.TEMPLATES.VENDORS.GET.SUCCESS: {
      return { ...state, vendors: action.data }
    }
    case GRPC.TEMPLATES.VENDORS.CREATE.SUCCESS: {
      return { ...state, vendorPageShowAddVendor: false }
    }
    case GRPC.TEMPLATES.CATEGORIES.GET.SUCCESS: {
      return { ...state, categories: action.data }
    }
    case GRPC.TEMPLATES.CATEGORIES.CREATE.SUCCESS: {
      return { ...state, newCategory: action.data }
    }
    case GRPC.TEMPLATES.ITEMS.GET_BY_VENDOR.SUCCESS: {
      return { ...state, itemsOfCurrentVendor: action.data }
    }
    case GRPC.TEMPLATES.ITEMS.GET_BY_CATEGORY.SUCCESS: {
      return state
    }
    case GRPC.TEMPLATES.ITEMS.CREATE.SUCCESS: {
      return state
    }
    case GRPC.TEMPLATES.ITEMS.ADD_TO_VENDOR: {
      return state
    }
    case TEMPLATES.VENDOR_PAGE_SHOW_ADD_VENDOR: {
      return { ...state, vendorPageShowAddVendor: true }
    }
    case TEMPLATES.VENDOR_PAGE_HIDE_ADD_VENDOR: {
      return { ...state, vendorPageShowAddVendor: false }
    }
    case TEMPLATES.ITEM_PAGE_SET_CURRENT_VENDOR: {
      return { ...state, currentVendor: +action.vendorId }
    }
    case TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_CREATE: {
      return { ...state, itemPageShowCategoryCreate: true }
    }
    case TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE: {
      return { ...state, itemPageShowCategoryCreate: false }
    }
    case TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_SELECT: {
      return { ...state, itemPageShowCategorySelect: true }
    }
    case TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT: {
      return { ...state, itemPageShowCategorySelect: false }
    }
    case TEMPLATES.ITEM_PAGE_ADD_NEW_CATEGORY: {
      return { ...state, newCategory: action.category }
    }
    default: {
      return state
    }
  }
}
