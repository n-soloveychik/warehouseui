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

class MakeOrder extends Component {
  state = {
    invoices: [],
    newInvoice: null,
    newInvoiceCount: 0,
    invoicesInOrder: [],
    name: '',
  }

  componentDidMount = async () => {
    await this.getInvoices()
  }

  getInvoices = async () => {
    const response = await REQUEST.getTemplateInvoices()
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

  menuItems = [
    {
      name: 'Заказы',
      link: '/',
    },
    {
      name: 'Конструктор комплектовочных ведомостей',
      link: '/constructor/invoices',
    },
  ]

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
                    options={this.state.invoices}
                    value={this.state.newInvoice}
                    getOptionLabel={(invoice) => invoice.invoice_code}
                    onChange={this.changeNewInvoice}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
