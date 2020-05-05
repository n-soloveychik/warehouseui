import React from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
import { selectArticule, selectAccountContract } from '@/redux/actions/actions'

function mapStateToProps(state) {
  state = state.warehouse
  return {
    accountContracts: Object.keys(state.list),
    articules: state.currentAccountContract
      ? state.list[state.currentAccountContract]
      : [],
    products: state.table,
    currentAccountContract: state.currentAccountContract,
    currentArticule: state.currentArticule,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectAccountContract: (id) => dispatch(selectAccountContract(id)),
    selectArticule: (id) => dispatch(selectArticule(id)),
  }
}

const Lists = (props) => (
  <Grid container className={classes.lists} spacing={3}>
    <Grid className={classes.column} item xs={6}>
      <CList
        title={'Счет - договор'}
        items={props.accountContracts}
        handleItemClick={props.selectAccountContract}
        currentItem={props.currentAccountContract}
      ></CList>
    </Grid>
    <Grid className={classes.column} item xs={6}>
      <CList
        title='Артикул'
        items={props.articules}
        handleItemClick={props.selectArticule}
        currentItem={props.currentArticule}
      ></CList>
    </Grid>
  </Grid>
)

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
