import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import CheckItemsTable from '@/pages/Items/CheckItemsTable/CheckItemsTable'
import CHeader from '@/components/CHeader/CHeader'
import classes from './Items.module.scss'
import { SwipeableDrawer } from '@material-ui/core'
import { warehouseActions } from '@/redux/actions/actions'
import ContextMenu from './ContextMenu/ContextMenu'
import { isMobileOnly } from 'react-device-detect'
import CheckItemsCard from './CheckItemsCards/CheckItemsCards'

class Items extends Component {
  state = {
    sideOpened: false,
    menuAnchorEl: null,
    menuItem: null,
  }

  async componentDidMount() {
    const order_id = this.props.match.params.order
    const invoice_id = this.props.match.params.invoice
    if (order_id && invoice_id) {
      await this.props.setCurrentParams(order_id, invoice_id)
    } else {
      await this.props.getOrders()
    }
    if (
      (!this.props.currentOrder || !this.props.currentInvoice) &&
      this.props.currentOrderId
    ) {
      this.openSidebar()
    }
  }

  componentDidUpdate(prevProps) {
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

  openCreateClaim = (itemId) => {
    this.props.history.push(
      `${this.props.location.pathname}/item/${itemId}/new-claim`
    )
  }

  openClaims = (itemId) => {
    this.props.history.push(
      `${this.props.location.pathname}/item/${itemId}/claims`
    )
  }

  closeContextMenu = () => {
    this.setState({
      menuAnchorEl: null,
    })
  }

  menuItems = [
    {
      name: 'Конструктор заказов',
      link: '/constructor/orders',
    },
    {
      name: 'Конструктор комплектовочных ведомостей',
      link: '/constructor/invoices',
    },
    {
      name: `Все претензии`,
      link: `/claims`,
    },
  ]

  render() {
    const headerText = this.props.currentInvoice
      ? `${this.props.currentOrder} / ${this.props.currentInvoiceCode}`
      : 'Открыть комплектовочную ведомость'
    const mobileHeaderText = this.props.currentInvoice
      ? `${this.props.currentOrder} / ${this.props.currentInvoiceCode}`
      : 'Ведомость'
    return (
      <div className='page'>
        <CHeader
          menuItems={this.menuItems}
          text={headerText}
          mobileText={mobileHeaderText}
          onTextClick={this.openSidebar}
        ></CHeader>
        {isMobileOnly ? (
          <CheckItemsCard contextMenuButtonClick={this.openContextMenu} />
        ) : (
          <>
            <CheckItemsTable contextMenuButtonClick={this.openContextMenu} />
          </>
        )}
        <SwipeableDrawer
          onOpen={this.openSidebar}
          onClose={this.closeSidebar}
          className={`${classes.Side} ${
            isMobileOnly && classes['Side--mobile']
          }`}
          open={this.state.sideOpened}
          PaperProps={{ className: isMobileOnly ? classes.Side__paper : '' }}
        >
          <Lists></Lists>
        </SwipeableDrawer>
        <ContextMenu
          open={!!this.state.menuAnchorEl}
          item={this.state.menuItem}
          anchorEl={this.state.menuAnchorEl}
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
      (order) => order.order_id === state.warehouse.currentOrder
    )?.order_id,
    currentInvoice: state.warehouse.currentInvoice,
    currentInvoiceCode: state.warehouse.invoices.find(
      (invoice) => invoice.invoice_id === +state.warehouse.currentInvoice
    )?.invoice_code,
    isOrder: (orderNum) =>
      !!state.warehouse.invoices.find(
        (invoice) => invoice.orderNum === orderNum
      ),
    isInvoice: (invoice) =>
      !!state.warehouse.invoices.find((invoice) => invoice.invoice === invoice),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: () => warehouseActions.orders.get(dispatch),
    getInvoicesByOrder: (orderId) =>
      warehouseActions.invoices.get(dispatch, orderId),
    showError: (title, text) =>
      warehouseActions.errorActions.showError(dispatch, title, text),
    setCurrentParams: (order_id, invoice_id) =>
      warehouseActions.uriParams.set(dispatch, order_id, invoice_id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
