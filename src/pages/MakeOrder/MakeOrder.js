import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { REQUEST } from '@/api'
import { errorActions } from '@/redux/actions/actions'
import { ROUTER } from '@/redux/actions/actionNames'
import CHeader from '@/components/CHeader/CHeader'
import { menuRoutesConfig } from '@/configs/menuRoutes'
import _ from 'lodash'

class MakeOrder extends Component {
  state = {
    invoices: [],
    invoiceSearchParam: '',
    currentMountingTypes: [],
    mountingTypes: [],
    newMountingType: null,
    newInvoice: null,
    newInvoiceCount: 0,
    invoicesInOrder: [],
    name: '',
  }

  disableNewMountingType = () =>
    this.state.mountingTypes.length === 0 || !this.state.newInvoice

  getDebouncedInvoices = _.debounce(async (searchStr) => {
    if (searchStr.length < 2) {
      return
    }
    const response = await REQUEST.getTemplateInvoices(searchStr)
    if (response.status === 401) {
      this.props.unauthorized()
      return
    }
    if (response.status !== 200) {
      this.props.showError(response.status, response.data.message)
      return
    }
    this.setState({
      invoices: response.data,
    })
  }, 400)

  getMountingTypes = async (invoiceId) => {
    const response = await REQUEST.getTemplateMountingTypes(invoiceId)
    if (response.status === 401) {
      this.props.unauthorized()
      return
    }
    if (response.status !== 200) {
      this.props.showError(response.status, response.data.message)
      return
    }
    this.setState({
      mountingTypes: response.data,
      newMountingType: response.data[0] || null,
    })
  }

  getmountingTypes = () =>
    this.newInvoice ? this.currentMountingTypes : this.mountingTypes

  changeNewMountingType = (_, newMountingType) => {
    const newState = { ...this.state, newMountingType }
    this.setState(newState)
  }

  changeNewInvoiceSearch = (event) => {
    const searchStr = event.target.value
    this.getDebouncedInvoices(searchStr)
    this.setState({
      invoiceSearchParam: searchStr,
    })
  }

  changeNewInvoice = (_, newInvoice) => {
    const newState = { ...this.state, newInvoice }
    this.getMountingTypes(newInvoice.invoice_id)
    if (!newInvoice) {
      newState.newInvoiceCount = 0
    }
    if (newState.newInvoiceCount === 0 && newInvoice) {
      newState.newInvoiceCount = 1
    }
    this.setState(newState)
  }

  addInvoice = () => {
    const newState = { ...this.state }
    newState.invoicesInOrder.push({
      ...newState.newInvoice,
      mount_id: newState.newMountingType.id,
      mount_type: newState.newMountingType.type,
      count: newState.newInvoiceCount,
    })
    newState.newInvoice = null
    newState.newMountingType = null
    newState.newInvoiceCount = 0
    newState.inputValue = ''
    newState.invoices = newState.invoices.filter(
      (invoice) =>
        !this.state.invoicesInOrder.find(
          (inv) => inv.invoice_code === invoice.invoice_code
        )
    )
    this.setState(newState)
  }

  editInvoice = (index, value) => {
    const newState = { ...this.state }
    newState.invoicesInOrder[index].count += value
    this.setState(newState)
  }

  removeInvoice = async (index) => {
    const newState = { ...this.state }
    newState.invoicesInOrder = newState.invoicesInOrder.filter(
      (inv, i) => i !== index
    )
    this.setState(newState)
  }

  makeOrder = async () => {
    const requestData = {
      invoices: this.state.invoicesInOrder,
      mountingTypes: this.state.mountingTypes,
      order_num: this.state.name,
    }
    const response = await REQUEST.createOrder(requestData)
    if (response.status === 401) {
      this.props.unauthorized()
      return
    }
    if (response.status < 200 || response.status > 299) {
      this.props.showError(response.status, response.data.message)
      return
    }
    this.setState({
      invoices: [],
      newInvoice: null,
      newInvoiceCount: 0,
      invoicesInOrder: [],
      name: '',
    })
  }

  menuItems = menuRoutesConfig.filter(
    (route) => route.link !== '/constructor/orders'
  )

  render() {
    return (
      <div
        className='page'
        style={{
          padding: 20,
          paddingTop: 70,
          paddingBottom: 64,
          overflow: 'auto',
        }}
      >
        <CHeader menuItems={this.menuItems} />
        <div>
          <div
            style={{
              marginBottom: 50,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              label='Номер заказа'
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              style={{ marginRight: 20 }}
            />
            <Button
              disabled={
                this.state.name.length < 3 || !this.state.invoicesInOrder.length
              }
              variant={
                this.state.name.length < 3 || !this.state.invoicesInOrder.length
                  ? 'text'
                  : 'contained'
              }
              color='primary'
              onClick={this.makeOrder}
            >
              Создать заказ
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <p style={{ minWidth: 168 }}>Тип монтажа</p>
                </TableCell>
                <TableCell>
                  <p style={{ minWidth: 170 }}>
                    Номер комплектовочной ведомости
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>Количество</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.invoicesInOrder.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>{invoice.mount_type}</TableCell>
                  <TableCell>{invoice.invoice_code}</TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      disabled={invoice.count < 2}
                      onClick={() => this.editInvoice(index, -1)}
                    >
                      -
                    </Button>
                  </TableCell>
                  <TableCell>{invoice.count}</TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      disabled={invoice.count > 100}
                      onClick={() => this.editInvoice(index, 1)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.removeInvoice(index)}>
                      Удалить из заказа
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Autocomplete
                    disabled={this.disableNewMountingType()}
                    options={this.state.mountingTypes}
                    value={this.state.newMountingType}
                    getOptionLabel={(type) => type.type}
                    onChange={this.changeNewMountingType}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Тип монтажа'
                        variant='outlined'
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={this.state.invoices}
                    value={this.state.newInvoice}
                    getOptionLabel={(invoice) => invoice.invoice_code}
                    onChange={this.changeNewInvoice}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={this.changeNewInvoiceSearch}
                        value={this.state.invoiceSearchParam}
                        label='Комплектовочная ведомость'
                        variant='outlined'
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    disabled={this.state.newInvoiceCount < 2}
                    onClick={() =>
                      this.setState({
                        newInvoiceCount: this.state.newInvoiceCount - 1,
                      })
                    }
                    variant='contained'
                    color='primary'
                  >
                    -
                  </Button>
                </TableCell>
                <TableCell>{this.state.newInvoiceCount}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={
                      this.state.newInvoiceCount > 99 ||
                      !this.state.newInvoice ||
                      !this.state.newMountingType
                    }
                    onClick={() =>
                      this.setState({
                        newInvoiceCount: this.state.newInvoiceCount + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={
                      !this.state.newInvoice || !this.state.newMountingType
                    }
                    onClick={this.addInvoice}
                  >
                    Добавить в заказ
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    showError: (title, text) => errorActions.showError(dispatch, title, text),
    unauthorized: () => dispatch({ type: ROUTER.UNAUTHORIZED }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)
