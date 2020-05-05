import React, { Component } from 'react'
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

class Lists extends Component {
  render() {
    return (
      <Grid container className={classes.lists} spacing={3}>
        <Grid className={classes.column} item xs={6}>
          <CList
            title={'Счет - договор'}
            items={this.props.accountContracts}
            handleItemClick={this.props.selectAccountContract}
            currentItem={this.props.currentAccountContract}
          ></CList>
        </Grid>
        <Grid className={classes.column} item xs={6}>
          <CList
            title='Артикул'
            items={this.props.articules}
            handleItemClick={this.props.selectArticule}
            currentItem={this.props.currentArticule}
          ></CList>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
