export const foundOrdersGetter = (state) => {
  state = state.warehouse;
  const orders = state.orders;
  const search = state.orderSearch;
  return orders.filter(
    (order) =>
      order.order_num.includes(search) ||
      order.invoices.find((invoice) => invoice.invoice_code.includes(search))
  );
};
