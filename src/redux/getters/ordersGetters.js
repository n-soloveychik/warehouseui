export const foundOrdersGetter = (state) => {
  state = state.warehouse;
  const orders = state.orders;
  const search = state.orderSearch.toLowerCase();
  return orders.filter(
    (order) =>
      order.order_num.toLowerCase().includes(search) ||
      order.invoices.find((invoice) =>
        invoice.invoice_code.toLowerCase().includes(search)
      )
  );
};
