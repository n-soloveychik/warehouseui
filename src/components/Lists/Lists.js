import React from "react";
import { connect } from "react-redux";
import classes from "./Lists.module.scss";
import InvoiceList from "./InvoiceList/InvoiceList";
import { Grid } from "@material-ui/core";
import { warehouseActions } from "@/redux/actions/actions";
import { isMobileOnly } from "react-device-detect";
import OrdersList from "./OrdersList/OrdersList";
import OrderSearch from "./OrderSearch/OrderSearch";
import { foundOrdersGetter } from "@/redux/getters/ordersGetters";

const Lists = (props) => (
  <Grid
    container
    className={[
      classes.lists,
      isMobileOnly ? classes["lists--mobile"] : "",
    ].join(" ")}
    spacing={3}
  >
    <OrderSearch />
    <Grid className={classes.column} item xs={6}>
      <OrdersList
        loading={props.loading}
        items={props.orders}
        handleItemClick={props.selectOrder}
        currentItem={props.currentOrder}
        keyToRender="order_num"
        keyDetectCurrent="order_id"
      ></OrdersList>
    </Grid>
    {props.currentOrder &&
      props.orders &&
      props.orders.find((order) => order.order_id === props.currentOrder) && (
        <Grid className={classes.column} item xs={6}>
          <InvoiceList
            title="Ведомость"
            loading={props.loading}
            items={
              props.orders.find(
                (order) => order.order_id === props.currentOrder
              ).invoices || []
            }
            handleItemClick={props.selectInvoice}
            currentItem={props.currentInvoice}
            keyToRender="invoice_code"
            keyDetectCurrent="invoice_id"
          ></InvoiceList>
        </Grid>
      )}
  </Grid>
);

function mapStateToProps(state) {
  return {
    orders: foundOrdersGetter(state),
    currentOrder: state.warehouse.currentOrder,
    currentInvoice: state.warehouse.currentInvoice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: (id) => warehouseActions.orders.select(dispatch, id),
    selectInvoice: (id) => warehouseActions.invoices.select(dispatch, id),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
