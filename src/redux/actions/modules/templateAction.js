import { REQUEST } from "@/api";
import { API, ERROR, ROUTER } from "../actionNames";
import { apiCoreAction } from "./apiCoreAction";

export const getInvoiceTemplatesAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.INVOICES.GET,
    REQUEST.getTemplateInvoices
  );
};

export const createInvoiceTemplateAction = async (dispatch, invoice) => {
  let response = await apiCoreAction(
    dispatch,
    API.TEMPLATES.INVOICES.CREATE,
    REQUEST.createTemplateInvoice,
    invoice
  );
  if (response.status > 399) {
    dispatch({
      type: ERROR.OPEN,
      title: response.status,
      text: response.data.message,
    });
    return;
  }
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.INVOICES.GET,
    REQUEST.getTemplateInvoices
  );
};

export const getItemsByInvoiceAction = async (dispatch, invoiceId) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.ITEMS.GET_BY_INVOICE,
    REQUEST.getTemplateItems,
    invoiceId
  );
};

export const getCategoriesAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.CATEGORIES.GET,
    REQUEST.getItemCategories
  );
};

export const createCategoryAction = async (dispatch, categoryName) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.CATEGORIES.CREATE,
    REQUEST.template.category.create,
    categoryName
  );
};

export const createItemAction = async (dispatch, item) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.ITEMS.CREATE,
    REQUEST.createTemplateItem(item),
    item
  );
};

export const updateItemImageAction = async (
  dispatch,
  { itemId, image, invoiceId }
) => {
  const response = await REQUEST.updateTemplateItemImage(itemId, {
    image: image,
  });
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED });
    return;
  }
  if (response.status > 199 && response.status < 300) {
    getItemsByInvoiceAction(dispatch, invoiceId);
    return;
  }
  dispatch({
    type: ERROR.OPEN,
    title: response.status,
    text: response.data?.message,
  });
};

export const updateFieldAction = async (
  dispatch,
  { field, itemId, invoiceId, newValue }
) => {
  dispatch({
    type: API.TEMPLATES.ITEMS.UPDATE_FIELD.CALL,
    invoiceId,
    itemId,
    field,
    value: newValue,
  });
  const response = await REQUEST.updateTemplateItemField(
    field,
    invoiceId,
    itemId,
    { [field]: newValue }
  );
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED });
    return;
  }
  if (response.status === 200) {
    dispatch({
      type: API.TEMPLATES.ITEMS.UPDATE_FIELD.SUCCESS,
      invoiceId,
      itemId,
      field,
      item: response.data,
    });
    return;
  }

  dispatch({
    type: API.TEMPLATES.ITEMS.UPDATE_FIELD.FAILURE,
    invoiceId,
    itemId,
    field,
    oldValue: newValue,
  });
  dispatch({
    type: ERROR.OPEN,
    title: response.status,
    text: response.data?.message,
  });
};
