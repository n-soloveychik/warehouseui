import React, { Component } from 'react'
import Lists from '@/components/Lists/Lists'

class Warehouse extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <Lists />
  }
}

export default Warehouse
