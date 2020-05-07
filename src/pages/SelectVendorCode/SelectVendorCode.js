import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import { selectOrder, selectVendorCode } from '@/redux/actions/actions'

function mapStateToProps(state) {
  return {
    currentOrder: state.warehouse.currentOrder,
    currentVendorCode: state.warehouse.currentVendorCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: (id) => dispatch(selectOrder(id)),
    selectVendorCode: (id) => dispatch(selectVendorCode(id)),
  }
}

class SelectVendorCode extends Component {
  componentDidMount() {
    this.setStateFromQueryParams()
    this.redirectIfNeed()
  }

  componentDidUpdate(prevProps, prevState) {
    this.setQueryParams()
    this.redirectIfNeed()
  }

  redirectIfNeed() {
    let currentParams = new URLSearchParams(this.props.location.search)
    if (
      currentParams.has('currentOrder') &&
      currentParams.has('currentVendorCode')
    ) {
      this.props.history.push({
        pathname: '/items',
        search: currentParams.toString(),
      })
    }
  }

  setStateFromQueryParams() {
    let currentParams = new URLSearchParams(this.props.location.search)
    let orderFromQueryParams = currentParams.get('currentOrder')
    let vendorCodeFromQueryParams = currentParams.get('currentVendorCode')
    if (orderFromQueryParams) {
      this.props.selectOrder(orderFromQueryParams)
    }
    if (vendorCodeFromQueryParams) {
      this.props.selectVendorCode(vendorCodeFromQueryParams)
    }
  }

  setQueryParams() {
    let newParams = new URLSearchParams()
    let currentParams = new URLSearchParams(this.props.location.search)
    if (this.props.currentOrder) {
      newParams.append('currentOrder', this.props.currentOrder)
    }
    if (this.props.currentVendorCode) {
      newParams.append('currentVendorCode', this.props.currentVendorCode)
    }
    if (
      newParams.toString() &&
      newParams.toString() !== currentParams.toString()
    ) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: newParams.toString(),
      })
    }
  }

  render() {
    return <Lists />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectVendorCode)
