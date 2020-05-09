import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import CTable from '@/components/CTable/CTable'
import CHeader from '@/components/CHeader/CHeader'
import classes from './Items.module.scss'
import { IconButton, SwipeableDrawer } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {
  selectOrder,
  selectVendorCode,
  getOrders,
  getItemsByVendorCode,
  updateItemStatus,
} from '@/redux/actions/actions'
import { itemsGetter } from '@/redux/getters/items'

class Items extends Component {
  state = {
    sideOpened: false,
  }

  async componentDidMount() {
    await this.props.getOrders()
    await this.props.getItemsByVendorCode()
    await this.setStateFromQueryParams()
    await this.openDrawerOnStart()
  }

  componentDidUpdate(prevProps, prevState) {
    this.setQueryParams()
    if (
      this.props.currentVendorCode &&
      prevProps.currentVendorCode !== this.props.currentVendorCode
    ) {
      this.closeSidebar()
    }
  }

  openDrawerOnStart() {
    let currentParams = new URLSearchParams(this.props.location.search)
    if (
      !currentParams.has('currentOrder') ||
      !currentParams.has('currentVendorCode')
    ) {
      this.setState({ sideOpened: true })
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

  toggleSidebar = () => {
    this.setState({
      sideOpened: !this.state.sideOpened,
    })
  }

  openSidebar = () => {
    this.setState({
      sideOpened: true,
    })
  }

  closeSidebar = () => {
    this.setState({
      sideOpened: false,
    })
  }

  render() {
    const headerText = this.props.currentVendorCode
      ? `${this.props.currentOrder} / ${this.props.currentVendorCode}`
      : 'Открыть артикул'
    return (
      <div className={classes.Items}>
        <CHeader text={headerText} onTextClick={this.openSidebar}></CHeader>
        <CTable
          updateStatus={({ itemId, statusId }) =>
            this.props.updateItemStatus({ itemId, statusId })
          }
          data={this.props.table}
        ></CTable>
        <IconButton
          style={{ position: 'absolute' }}
          className={classes.IconButton}
          onClick={this.toggleSidebar}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <SwipeableDrawer
          onOpen={this.openSidebar}
          onClose={this.closeSidebar}
          className={classes.Side}
          open={this.state.sideOpened}
        >
          <Lists></Lists>
          <IconButton
            onClick={this.toggleSidebar}
            style={{ position: 'absolute' }}
            className={classes['Side-IconButton']}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </IconButton>
        </SwipeableDrawer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentOrder: state.warehouse.currentOrder,
    currentVendorCode: state.warehouse.currentVendorCode,
    table: itemsGetter(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: (id) => selectOrder(dispatch, id),
    selectVendorCode: (id) => selectVendorCode(dispatch, id),
    getOrders: () => getOrders(dispatch),
    getItemsByVendorCode: () => getItemsByVendorCode(dispatch, 1),
    updateItemStatus: ({ itemId, statusId }) =>
      updateItemStatus(dispatch, { statusId, itemId }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
