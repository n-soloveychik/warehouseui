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
  // selectInvoice,
  getOrders,
  getInvoicesByOrder,
  errorActions,
  setCurrentParams,
  // getItemsByInvoice,
  // updateItemStatus,
} from '@/redux/actions/actions'
import { checkItemsGetter } from '@/redux/getters/itemsGetters'
import ContextMenu from './ContextMenu/ContextMenu'
import { REQUEST } from '@/api'

class Items extends Component {
  state = {
    sideOpened: false,
    menuAnchorEl: null,
    menuItem: null,
  }

  async componentDidMount() {
    const order_num = this.props.match.params.order
    const invoice_code = this.props.match.params.invoice
    if (order_num && invoice_code) {
      await this.props.setCurrentParams(order_num, invoice_code)
    } else {
      await this.props.getOrders()
    }
    if (!this.props.currentOrder || !this.props.currentInvoice) {
      this.openSidebar()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.setURLParams()
    if (
      this.props.currentInvoice &&
      prevProps.currentInvoice !== this.props.currentInvoice
    ) {
      this.closeSidebar()
    }
  }

  setURLParams() {
    if (
      // eslint-disable-next-line
      this.props.match.params.order == this.props.currentOrder &&
      // eslint-disable-next-line
      this.props.match.params.invoice == this.props.currentInvoice
    ) {
      return
    }
    let path = this.props.currentOrder
      ? `/order/${this.props.currentOrder}/`
      : '/'
    path +=
      this.props.currentOrder && this.props.currentInvoice
        ? `invoice/${this.props.currentInvoice}`
        : ''
    this.props.history.push(path)
  }

  toggleSidebar = async () => {
    this.setState({
      sideOpened: !this.state.sideOpened,
    })
    if (!this.state.sideOpened) {
      await this.props.getOrders()
    }
  }

  openSidebar = async () => {
    this.setState({
      sideOpened: true,
    })
    await this.props.getOrders()
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

  setItemStatus = {
    inStock: (itemId) => {
      this.updateItemStatus(REQUEST.setItemStatusInStock.bind(null, itemId))
    },
    awaitDelivery: (itemId) =>
      this.updateItemStatus(
        REQUEST.setItemStatusAwaitDelivery.bind(null, itemId),
      ),
  }

  updateItemStatus = async (requestFn) => {
    const response = await requestFn()
    if (response.status === 200) {
      this.props.getInvoicesByOrder(this.props.currentOrderId)
    } else {
      this.props.showError(response.status, response.data.message || 'Ошибка')
    }
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
    const headerText = this.props.currentInvoice
      ? `${this.props.currentOrder} / ${this.props.currentInvoice}`
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
          setStatusInStock={(itemId) => this.setItemStatus.inStock(itemId)}
          setStatusAwaitDelivery={(itemId) =>
            this.setItemStatus.awaitDelivery(itemId)
          }
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
    currentOrderId: state.warehouse.orders.find(
      (order) => order.order_num === state.warehouse.currentOrder,
    )?.order_id,
    currentInvoice: state.warehouse.currentInvoice,
    table: checkItemsGetter(state),
    isOrder: (orderNum) =>
      !!state.warehouse.invoices.find(
        (invoice) => invoice.orderNum === orderNum,
      ),
    isInvoice: (invoice) =>
      !!state.warehouse.invoices.find((invoice) => invoice.invoice === invoice),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // selectOrder: (id) => selectOrder(dispatch, id),
    // selectInvoice: (id) => selectInvoice(dispatch, id),
    getOrders: () => getOrders(dispatch),
    getInvoicesByOrder: (orderId) => getInvoicesByOrder(dispatch, orderId),
    showError: (title, text) => errorActions.showError(dispatch, title, text),
    setCurrentParams: (order_num, invoice_code) =>
      setCurrentParams(dispatch, order_num, invoice_code),
    // getItemsByInvoice: () => getItemsByInvoice(dispatch, 1),
    // updateItemStatus: ({ itemId, statusId }) =>
    // updateItemStatus(dispatch, { statusId, itemId }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
