import { GRPC, TEMPLATES } from '../actions/actionNames'

const initialState = {
  vendors: [],
  vendorPageShowAddVendor: false,
  currentVendorId: null,
  itemsOfCurrentVendor: [],
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
      return state
    }
    case GRPC.TEMPLATES.CATEGORIES.CREATE.SUCCESS: {
      return state
    }
    case GRPC.TEMPLATES.ITEMS.GET_BY_VENDOR.SUCCESS: {
      return state
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
    default: {
      return state
    }
  }
}
