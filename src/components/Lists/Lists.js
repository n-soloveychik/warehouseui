import React from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
import { selectInvoice, selectOrder } from '@/redux/actions/actions'

const Lists = (props) => (
  <Grid container className={classes.lists} spacing={3}>
    <Grid className={classes.column} item xs={6}>
      <CList
        title={'Счет - договор'}
        loading={props.loading}
        items={props.orders}
        handleItemClick={props.selectOrder}
        currentItem={props.currentOrder}
        keyToRender='order_num'
        keyDetectCurrent='order_num'
      ></CList>
    </Grid>
    {props.currentOrder &&
      props.orders &&
      props.orders.find((order) => order.order_num === props.currentOrder) && (
        <Grid className={classes.column} item xs={6}>
          <CList
            title='Артикул'
            loading={props.loading}
            items={
              props.orders.find(
                (order) => order.order_num === props.currentOrder,
              ).invoices || []
            }
            handleItemClick={props.selectInvoice}
            currentItem={props.currentInvoice}
            keyToRender='invoice_code'
            keyDetectCurrent='invoice_code'
          ></CList>
        </Grid>
      )}
  </Grid>
)

function mapStateToProps(state) {
  state = state.warehouse
  return {
    orders: state.orders,
    // invoices: state.currentOrder ? list[state.currentOrder] : [],
    // products: state.table,
    currentOrder: state.currentOrder,
    currentInvoice: state.currentInvoice,
    // loading: state.isCallingGetOrders,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: (id) => selectOrder(dispatch, id),
    selectInvoice: (id) => selectInvoice(dispatch, id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
