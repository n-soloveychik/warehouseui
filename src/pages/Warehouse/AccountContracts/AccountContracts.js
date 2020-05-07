import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import classes from './Orders.module.scss'

class Orders extends Component {
  render() {
    return (
      <Grid container spacing={3} className={classes.container}>
        {this.props.orders.map((ac, index) => (
          <Grid key={index} item xs={6} lg={2} md={3} sm={4}>
            <Paper className={classes.item}>{ac}</Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

function mapStateToProps(store) {
  return {
    orders: store.orders.list,
  }
}

export default connect(mapStateToProps)(Orders)
