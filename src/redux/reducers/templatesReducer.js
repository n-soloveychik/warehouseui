import { API, TEMPLATES } from '../actions/actionNames'

const initialState = {
  cells: [
    {
      title: 'Место',
      name: 'lot',
      type: 'string',
      required: true,
      default: '',
      minLength: 1,
      maxLength: 100,
      style: { whiteSpace: 'nowrap', textAlign: 'center' },
    },
    {
      title: 'Артикул',
      name: 'item_num',
      type: 'string',
      required: true,
      default: '',
      minLength: 0,
      maxLength: 100,
      style: { textAlign: 'center' },
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
      style: { textAlign: 'center' },
    },
    {
      title: 'Кол-во',
      name: 'count',
      type: 'number',
      required: true,
      default: 0,
      min: 1,
      max: 10000,
      style: { textAlign: 'center' },
    },
    {
      title: 'Масса',
      name: 'weight',
      type: 'float',
      required: true,
      default: 0,
      min: 0.001,
      max: 10000,
      style: { textAlign: 'center' },
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
      style: { fontSize: 12, maxWidth: 200, textAlign: 'center' },
    },
  ],
  invoices: [],
  invoicePageShowAddInvoice: false,
  currentInvoiceId: null,
  itemsOfCurrentInvoice: [],
  categories: [],
  newCategory: {},
  itemPageShowCategoryCreate: false,
  itemPageShowCategorySelect: false,
}

const obj = {
  [API.TEMPLATES.INVOICES.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    invoices: data,
  }),
  [API.TEMPLATES.INVOICES.CREATE.SUCCESS]: (state) => ({
    ...state,
    invoicePageShowAddInvoice: false,
  }),
  [API.TEMPLATES.CATEGORIES.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    categories: data,
  }),
  [API.TEMPLATES.CATEGORIES.CREATE.SUCCESS]: (state, { data }) => ({
    ...state,
    newCategory: data || {},
  }),
  [API.TEMPLATES.ITEMS.GET_BY_INVOICE.SUCCESS]: (state, action) => {
    const newState = state
    const newCategory = !!action.data.find(
      (item) =>
        item.category === newState.newCategory.category ||
        item.categoryId === newState.newCategory.categoryId,
    )
      ? {}
      : newState.newCategory.categoryId
    newState.itemsOfCurrentInvoice = [...action.data]
    newState.newCategory = newCategory || {}
    return { ...newState }
  },
  [API.TEMPLATES.ITEMS.GET_BY_CATEGORY.SUCCESS]: (state) => state,
  [API.TEMPLATES.ITEMS.CREATE.SUCCESS]: (state) => state,
  [API.TEMPLATES.ITEMS.ADD_TO_INVOICE]: (state) => state,
  [TEMPLATES.INVOICE_PAGE_SHOW_ADD_INVOICE]: (state) => ({
    ...state,
    invoicePageShowAddInvoice: true,
  }),
  [TEMPLATES.INVOICE_PAGE_HIDE_ADD_INVOICE]: (state) => ({
    ...state,
    invoicePageShowAddInvoice: false,
  }),
  [TEMPLATES.ITEM_PAGE_SET_CURRENT_INVOICE]: (state, action) => {
    const itemsOfCurrentInvoice =
      +action.invoiceId === state.currentInvoiceId
        ? state.itemsOfCurrentInvoice
        : []
    return {
      ...state,
      currentInvoiceId: +action.invoiceId,
      itemsOfCurrentInvoice,
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
  [TEMPLATES.INVOICE_PAGE_CLEAR_ITEMS]: (state) => ({
    ...state,
    itemsOfCurrentInvoice: [],
  }),
  DEFAULT: (state) => state,
}

export default (state = initialState, action) => {
  return obj[action.type] ? obj[action.type](state, action) : obj.DEFAULT(state)
}
