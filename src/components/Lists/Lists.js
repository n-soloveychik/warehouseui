import React from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
import { warehouseActions } from '@/redux/actions/actions'
import { isMobileOnly } from 'react-device-detect'

const Lists = (props) => (
  <Grid
    container
    className={[
      classes.lists,
      isMobileOnly ? classes['lists--mobile'] : '',
    ].join(' ')}
    spacing={3}
  >
    <Grid className={classes.column} item xs={6}>
      <CList
        title={'Заказ'}
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
            title='Ведомость'
            loading={props.loading}
            items={
              props.orders.find(
                (order) => order.order_num === props.currentOrder
              ).invoices || []
            }
            handleItemClick={props.selectInvoice}
            currentItem={props.currentInvoice}
            keyToRender='invoice_code'
            keyDetectCurrent='invoice_id'
          ></CList>
        </Grid>
      )}
  </Grid>
)

function mapStateToProps(state) {
  state = state.warehouse
  return {
    orders: state.orders,
    currentOrder: state.currentOrder,
    currentInvoice: state.currentInvoice,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: (id) => warehouseActions.orders.select(dispatch, id),
    selectInvoice: (id) => warehouseActions.invoices.select(dispatch, id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
