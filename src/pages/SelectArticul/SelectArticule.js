import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import { selectAccountContract, selectArticule } from '@/redux/actions/actions'

function mapStateToProps(state) {
  return {
    currentAccountContract: state.warehouse.currentAccountContract,
    currentArticule: state.warehouse.currentArticule,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectAccountContract: (id) => dispatch(selectAccountContract(id)),
    selectArticule: (id) => dispatch(selectArticule(id)),
  }
}

class SelectArticule extends Component {
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
    let accountContractFromQueryParams = currentParams.get(
      'currentAccountContract',
    )
    let articuleFromQueryParams = currentParams.get('currentArticule')
    if (accountContractFromQueryParams && articuleFromQueryParams) {
      this.props.history.push({
        pathname: '/items',
        search: currentParams.toString(),
      })
    }
  }

  setStateFromQueryParams() {
    let currentParams = new URLSearchParams(this.props.location.search)
    let accountContractFromQueryParams = currentParams.get(
      'currentAccountContract',
    )
    let articuleFromQueryParams = currentParams.get('currentArticule')
    if (accountContractFromQueryParams) {
      this.props.selectAccountContract(accountContractFromQueryParams)
    }
    if (articuleFromQueryParams) {
      this.props.selectArticule(articuleFromQueryParams)
    }
  }

  setQueryParams() {
    let newParams = new URLSearchParams()
    let currentParams = new URLSearchParams(this.props.location.search)
    if (this.props.currentAccountContract) {
      newParams.append(
        'currentAccountContract',
        this.props.currentAccountContract,
      )
    }
    if (this.props.currentArticule) {
      newParams.append('currentArticule', this.props.currentArticule)
    }
    if (
      newParams.toString() &&
      newParams.toString() !== currentParams.toString()
    ) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: newParams.toString() ? '?' + newParams.toString() : '',
      })
    }
  }

  render() {
    return <Lists />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectArticule)
