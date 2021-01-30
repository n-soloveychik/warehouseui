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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { REQUEST } from '@/api'
import { errorActions } from '@/redux/actions/actions'
import { ROUTER } from '@/redux/actions/actionNames'
import CHeader from '@/components/CHeader/CHeader'
import { menuRoutesConfig } from '@/configs/menuRoutes'
import _ from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress'

class MakeOrder extends Component {
  state = {
    invoices: [],
    loadingInvoices: false,
    loadingMountingTypes: false,
    invoiceSearchParam: '',
    mountingTypes: [],
    newMountingType: null,
    newInvoice: null,
    newInvoiceCount: 0,
    invoicesInOrder: [],
    name: '',
  }

  startLoadingInvoices = () => this.setState({ loadingInvoices: true })
  stopLoadingInvoices = () => this.setState({ loadingInvoices: false })
  startLoadingMountingTypes = () =>
    this.setState({ loadingMountingTypes: true })
  stopLoadingMountingTypes = () =>
    this.setState({ loadingMountingTypes: false })
  clearMountingTypes = () =>
    this.setState({ mountingTypes: [], newMountingType: null })

  disableNewMountingType = () =>
    this.state.mountingTypes.length === 0 || !this.state.newInvoice

  getDebouncedInvoices = _.debounce(async (searchStr) => {
    const response = await REQUEST.getTemplateInvoices(searchStr)
    this.stopLoadingInvoices()
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

  changeNewMountingType = (event) => {
    const newState = {
      ...this.state,
      newMountingType: this.state.mountingTypes.find(
        (type) => Number(type.id) === Number(event.target.value)
      ),
    }
    this.setState(newState)
  }

  changeNewInvoiceSearch = (event) => {
    const searchStr = event.target.value
    if (searchStr?.length > 1) {
      this.startLoadingInvoices()
      this.getDebouncedInvoices(searchStr)
    }
    this.setState({
      invoiceSearchParam: searchStr,
    })
  }

  changeNewInvoice = async (_, newInvoice) => {
    await this.clearMountingTypes()
    const newState = { ...this.state, newInvoice }
    if (!newInvoice) {
      newState.newInvoiceCount = 0
    } else {
      this.startLoadingMountingTypes()
      this.getMountingTypes(newInvoice?.invoice_id)
      this.stopLoadingMountingTypes()
      if (newState.newInvoiceCount === 0 && newInvoice) {
        newState.newInvoiceCount = 1
      }
    }
    this.setState(newState)
  }

  changeInvoiceMountingType = (index, event) => {
    if (!event.target.value) {
      return
    }
    const newState = _.cloneDeep(this.state)
    const allTypes = newState.invoicesInOrder[index].mountingTypes
    const mount_id = Number(event.target.value)
    const mount_type = allTypes.find((type) => type.id === mount_id).type
    newState.invoicesInOrder[index] = {
      ...newState.invoicesInOrder[index],
      mount_id,
      mount_type,
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
      mountingTypes: [...newState.mountingTypes],
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
                  <TableCell>
                    <Select
                      value={invoice.mount_id}
                      onChange={this.changeInvoiceMountingType.bind(
                        null,
                        index
                      )}
                      label='Тип монтажа'
                    >
                      {invoice.mountingTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
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
                  <FormControl style={{ minWidth: 150 }}>
                    <InputLabel htmlFor='select-mounting-type'>
                      Тип монтажа
                    </InputLabel>
                    <Select
                      id='select-mounting-type'
                      value={
                        this.state.newMountingType
                          ? `${this.state.newMountingType?.id}`
                          : ''
                      }
                      onChange={this.changeNewMountingType}
                      label='Тип монтажа'
                      disabled={this.disableNewMountingType()}
                    >
                      {this.state.mountingTypes?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={this.state.invoices}
                    value={this.state.newInvoice}
                    getOptionLabel={(invoice) => invoice.invoice_code}
                    onChange={this.changeNewInvoice}
                    noOptionsText={
                      this.state.invoiceSearchParam?.length < 2
                        ? 'Введите минимум 2 символа для поиска'
                        : 'Нет элементов удоблетворящих запросу'
                    }
                    loading={this.state.loadingInvoices}
                    loadingText='Поиск...'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={this.changeNewInvoiceSearch}
                        value={this.state.invoiceSearchParam}
                        label='Комплектовочная ведомость'
                        variant='outlined'
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {this.state.loadingInvoices ? (
                                <CircularProgress color='inherit' size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
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
