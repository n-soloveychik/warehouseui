import React, { Component } from 'react'
import classes from './Warehouse.module.scss'
import Lists from '@/components/Lists/Lists'
import SearchField from './SearchField/SearchField'

class Warehouse extends Component {
  render() {
    return (
      <>
        <div className={classes.search}>
          <SearchField />
        </div>
        <Lists />
      </>
    )
  }
}

export default Warehouse
