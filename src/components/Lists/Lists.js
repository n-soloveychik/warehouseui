import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
import { toggleArticle, toggleAccountContract } from '@/redux/actions/actions'
import CTable from './CTable/CTable'

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
    selectAccountContract: (id) => dispatch(toggleAccountContract(id)),
    selectArticule: (id) => dispatch(toggleArticle(id)),
  }
}

class Lists extends Component {
  render() {
    return (
      <Grid container className={classes.lists} spacing={3}>
        <Grid className={classes.column} item xs={1} sm={1} md={1} lg={1}>
          <CList
            items={this.props.accountContracts}
            handleItemClick={this.props.selectAccountContract}
            currentItem={this.props.currentAccountContract}
          ></CList>
        </Grid>
        <Grid className={classes.column} item xs={2} sm={2} md={2} lg={2}>
          <CList
            items={this.props.articules}
            handleItemClick={this.props.selectArticule}
            currentItem={this.props.currentArticule}
          ></CList>
        </Grid>
        <Grid className={classes.column} item xs={8} sm={8} md={8} lg={8}>
          <CTable data={this.props.products}></CTable>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
