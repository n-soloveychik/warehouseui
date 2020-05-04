import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Lists.module.scss'
import CList from './CList/CList'
import { Grid } from '@material-ui/core'
import { toggleArticle, toggleAccountContract } from '@/redux/actions/actions'

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
  state = {
    currentAccountContract: -1,
    currentArticule: -1,
  }

  selectAccountContract = (event, id) => {
    this.setState({
      currentAccountContract: id,
    })
    this.props.selectAccountContract(this.props.accountContracts[id])
  }

  selectArticule = (event, id) => {
    this.setState({
      selectArticule: id,
    })
    this.props.selectArticule(this.props.accountContracts[id])
  }

  render() {
    return (
      <Grid container className={classes.lists} spacing={3}>
        <Grid className={classes.column} item xs={6}>
          {/* <Tabs
            orientation='vertical'
            variant='scrollable'
            value={this.state.currentAccountContract}
            onChange={this.selectAccountContract}
          >
            {this.props.accountContracts.map((a, index) => (
              <Tab key={index} label={a}></Tab>
            ))}
          </Tabs> */}
          <CList
            title={'Счет - договор'}
            items={this.props.accountContracts}
            handleItemClick={this.props.selectAccountContract}
            currentItem={this.props.currentAccountContract}
          ></CList>
        </Grid>
        <Grid className={classes.column} item xs={6}>
          {/* <Tabs
            orientation='vertical'
            variant='scrollable'
            value={this.state.currentArticule}
            onChange={this.selectArticule}
          >
            {this.props.accountContracts.map((a, index) => (
              <Tab key={index} label={a}></Tab>
            ))}
          </Tabs> */}
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
