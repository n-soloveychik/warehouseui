import React, { Component } from 'react'
import classes from './Warehouse.module.scss'
import AccountContracts from './AccountContracts/AccountContracts'
import SearchField from './SearchField/SearchField'

class Warehouse extends Component {
  render() {
    return (
      <>
        <div className={classes.search}>
          <SearchField />
        </div>
        <AccountContracts />
      </>
    )
  }
}

export default Warehouse
