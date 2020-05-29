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

const initialState = {
  invoices: [],
  newInvoice: null,
  newInvoiceCount: 0,
  invoicesInOrder: [],
  name: '',
}

class MakeOrder extends Component {
  state = { ...initialState }

  componentDidMount = async () => {
    await this.getInvoices()
  }

  getInvoices = async () => {
    const response = await REQUEST.getTemplateInvoices()
    if (response.status !== 200) {
      this.props.showError(response.status, response.data.message)
      return
    }
    this.setState({
      invoices: response.data,
    })
  }

  changeNewInvoice = (event, newInvoice) => {
    const newState = { ...this.state, newInvoice }
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
      count: newState.newInvoiceCount,
    })
    newState.newInvoice = null
    newState.newInvoiceCount = 0
    newState.inputValue = ''
    newState.invoices = newState.invoices.filter(
      (invoice) =>
        !this.state.invoicesInOrder.find(
          (inv) => inv.invoice_code === invoice.invoice_code,
        ),
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
      (inv, i) => i !== index,
    )
    this.setState(newState)
    await this.getInvoices()
  }

  makeOrder = async () => {
    const requestData = {
      invoices: this.state.invoicesInOrder,
      order_num: this.state.name,
    }
    const response = await REQUEST.createOrder(requestData)
    if (response.status !== 201) {
      this.props.showError(response.status, response.message)
      return
    }
    this.setState({ ...initialState })
  }

  render() {
    return (
      <div style={{ padding: 20, overflow: 'auto', height: '100vh' }}>
        <div>
          <TextField
            label='Код заказа'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <Button
            disabled={
              this.state.name.length > 2 || !this.state.invoicesInOrder.length
            }
            variant={
              this.state.name.length > 2 || !this.state.invoicesInOrder.length
                ? 'text'
                : 'contained'
            }
            color='primary'
            onClick={this.makeOrder}
          >
            Создать
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер комплектовочной ведомости</TableCell>
              <TableCell></TableCell>
              <TableCell>Количество</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.invoicesInOrder.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>{invoice.invoice_code}</TableCell>
                <TableCell>
                  <Button onClick={() => this.editInvoice(index, -1)}>-</Button>
                </TableCell>
                <TableCell>{invoice.count}</TableCell>
                <TableCell>
                  <Button onClick={() => this.editInvoice(index, 1)}>+</Button>
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
                  options={this.state.invoices}
                  value={this.state.newInvoice}
                  getOptionLabel={(invoice) => invoice.invoice_code}
                  onChange={this.changeNewInvoice}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Номер Комплектовочной ведомости'
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
                    this.state.newInvoiceCount > 99 || !this.state.newInvoice
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
                  disabled={!this.state.newInvoice}
                  onClick={this.addInvoice}
                >
                  Добавить в заказ
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)
