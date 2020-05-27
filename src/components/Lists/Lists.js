import React from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
// import { selectVendorCode, selectOrder } from '@/redux/actions/actions'

const Lists = (props) => (
  <Grid container className={classes.lists} spacing={3}>
    <Grid className={classes.column} item xs={6}>
      <CList
        title={'Счет - договор'}
        loading={props.loading}
        items={props.orders}
        handleItemClick={props.selectOrder}
        currentItem={props.currentOrder}
      ></CList>
    </Grid>
    <Grid className={classes.column} item xs={6}>
      {/* <CList
        title='Артикул'
        loading={props.loading}
        items={props.vendorCodes}
        handleItemClick={props.selectVendorCode}
        currentItem={props.currentVendorCode}
      ></CList> */}
    </Grid>
  </Grid>
)

function mapStateToProps(state) {
  console.log(state.warehouse.orders)
  state = state.warehouse
  return {
    orders: state.orders,
    // vendorCodes: state.currentOrder ? list[state.currentOrder] : [],
    // products: state.table,
    // currentOrder: state.currentOrder,
    // currentVendorCode: state.currentVendorCode,
    // loading: state.isCallingGetOrders,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // selectOrder: (id) => selectOrder(dispatch, id),
    // selectVendorCode: (id) => selectVendorCode(dispatch, id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
