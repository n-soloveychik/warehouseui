import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import CheckItemsTable from '@/pages/Items/CheckItemsTable/CheckItemsTable'
import CHeader from '@/components/CHeader/CHeader'
import classes from './Items.module.scss'
import { IconButton, SwipeableDrawer } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {
  // selectOrder,
  // selectVendorCode,
  getOrders,
  // getItemsByVendorCode,
  // updateItemStatus,
} from '@/redux/actions/actions'
import { checkItemsGetter } from '@/redux/getters/itemsGetters'
import ContextMenu from './ContextMenu/ContextMenu'

class Items extends Component {
  state = {
    sideOpened: false,
    shouldUpdate: false,
    menuAnchorEl: null,
    menuItem: null,
  }

  async componentDidMount() {
    await this.props.getOrders()
    // await this.props.getItemsByVendorCode()
    // await this.setStateFromURLParams()
    // this.setState({ shouldUpdate: true })
    // await this.openDrawerOnStart()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.shouldUpdate
  // }

  componentDidUpdate(prevProps, prevState) {
    this.setURLParams()
    if (
      this.props.currentVendorCode &&
      prevProps.currentVendorCode !== this.props.currentVendorCode
    ) {
      this.closeSidebar()
    }
  }

  openDrawerOnStart() {
    if (!this.props.match.params.order || !this.props.match.params.vendor) {
      this.setState({ sideOpened: true })
    }
  }

  setStateFromURLParams() {
    let order = this.props.match.params.order
    let vendor = this.props.match.params.vendor
    if (!order || !this.props.isOrder(order)) {
      this.props.history.push('/')
      return
    }
    this.props.selectOrder(order)
    if (!vendor || !this.props.isVendor(vendor)) {
      this.props.history.push(`/order/${order}`)
      return
    }
    this.props.selectVendorCode(vendor)
  }

  setURLParams() {
    if (
      // eslint-disable-next-line
      this.props.match.params.order == this.props.currentOrder &&
      // eslint-disable-next-line
      this.props.match.params.vendor == this.props.currentVendorCode
    ) {
      return
    }
    let path = this.props.currentOrder
      ? `/order/${this.props.currentOrder}/`
      : '/'
    path +=
      this.props.currentOrder && this.props.currentVendorCode
        ? `vendor-code/${this.props.currentVendorCode}`
        : ''
    this.props.history.push(path)
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

  openContextMenu = (item, element) => {
    this.setState({
      menuAnchorEl: element,
      menuItem: item,
    })
  }

  openCreateClaim = (itemId) => {
    this.props.history.push(
      `${this.props.location.pathname}/item/${itemId}/new-claim`,
    )
  }

  openClaims = (itemId) => {
    this.props.history.push(
      `${this.props.location.pathname}/item/${itemId}/claims`,
    )
  }

  closeContextMenu = () => {
    this.setState({
      menuAnchorEl: null,
    })
  }

  render() {
    const headerText = this.props.currentVendorCode
      ? `${this.props.currentOrder} / ${this.props.currentVendorCode}`
      : 'Открыть артикул'
    return (
      <div className='page'>
        <CHeader text={headerText} onTextClick={this.openSidebar}></CHeader>
        <CheckItemsTable
          contextMenuButtonClick={this.openContextMenu}
          updateStatus={({ itemId, statusId }) =>
            this.props.updateItemStatus({ itemId, statusId })
          }
          data={this.props.table}
        ></CheckItemsTable>
        <IconButton
          style={{ position: 'fixed' }}
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
        <ContextMenu
          open={!!this.state.menuAnchorEl}
          anchorEl={this.state.menuAnchorEl}
          item={this.state.menuItem}
          handleClose={this.closeContextMenu}
          createClaim={this.openCreateClaim}
          openClaims={this.openClaims}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentOrder: state.warehouse.currentOrder,
    currentVendorCode: state.warehouse.currentVendorCode,
    table: checkItemsGetter(state.warehouse.items),
    isOrder: (orderNum) =>
      !!state.warehouse.vendorCodes.find(
        (vendor) => vendor.orderNum === orderNum,
      ),
    isVendor: (vendorCode) =>
      !!state.warehouse.vendorCodes.find(
        (vendor) => vendor.vendorCode === vendorCode,
      ),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // selectOrder: (id) => selectOrder(dispatch, id),
    // selectVendorCode: (id) => selectVendorCode(dispatch, id),
    getOrders: () => getOrders(dispatch),
    // getItemsByVendorCode: () => getItemsByVendorCode(dispatch, 1),
    // updateItemStatus: ({ itemId, statusId }) =>
    // updateItemStatus(dispatch, { statusId, itemId }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
