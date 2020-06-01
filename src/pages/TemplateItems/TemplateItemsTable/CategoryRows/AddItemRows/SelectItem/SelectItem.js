import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell, Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { REQUEST } from '@/api'
import InputNumber from '../CreateItem/InputNumber/InputNumber'
import InputText from '../CreateItem/InputText/InputText'

class SelectItem extends Component {
  state = {
    currentItem: {},
    lot: '',
    count: 0,
    options: [],
    opened: true,
  }

  open = () => {
    this.setState({ opened: true })
  }

  close = () => {
    this.setState({ opened: false })
  }

  componentDidMount = async () => {
    if (!this.props.category_id) {
      return
    }
    let response = await REQUEST.getItemsOfCategory(this.props.category_id)
    let options = response.data
    this.setState({ options })
  }

  setCurrentItem = (item) => {
    this.setState({
      currentItem: item || {},
    })
  }

  isOkDisabled = () => {
    return (
      !this.state.currentItem.item_id ||
      this.state.lot ===
        this.props.cells.find((cell) => cell.name === 'lot').default ||
      this.state.count ===
        this.props.cells.find((cell) => cell.name === 'count').default ||
      !this.state.lot ||
      !this.state.count
    )
  }

  render() {
    return (
      <>
        <TableRow>
          {this.props.cells.map((cell, index) => (
            <TableCell key={index}>
              {cell.name === 'item_num' ? (
                <Autocomplete
                  onChange={(event, newValue) => this.setCurrentItem(newValue)}
                  options={this.state.options}
                  getOptionLabel={(option) => option.item_num}
                  open={this.state.opened}
                  fullWidth={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoFocus={true}
                      onBlur={this.close}
                      onFocus={this.open}
                      label='Артикул товара'
                      variant='outlined'
                    />
                  )}
                />
              ) : cell.name === 'image' && this.state.currentItem[cell.name] ? (
                <img
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                  }}
                  src={this.state.currentItem[cell.name]}
                  alt='Изображение'
                />
              ) : cell.name === 'lot' ? (
                <InputText
                  label={cell.title}
                  ready={(value) => this.setState({ [cell.name]: value })}
                  notReady={(value) =>
                    this.setState({ [cell.name]: cell.default })
                  }
                  minLength={cell.minLength}
                  maxLength={cell.maxLength}
                />
              ) : cell.name === 'count' ? (
                <InputNumber
                  ready={(value) => this.setState({ [cell.name]: value })}
                  notReady={(value) =>
                    this.setState({ [cell.name]: cell.default })
                  }
                  min={cell.min}
                  max={cell.max}
                  label={cell.title}
                />
              ) : (
                this.state.currentItem[cell.name]
              )}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell
            colSpan={this.props.cells.length + 1}
            style={{ textAlign: 'center' }}
          >
            <Button
              disabled={this.isOkDisabled()}
              onClick={() =>
                this.props.handleOk({
                  ...this.state.currentItem,
                  lot: this.state.lot,
                  count: this.state.count,
                })
              }
              color='primary'
              variant='contained'
              style={{ marginRight: 30 }}
            >
              Ок
            </Button>
            <Button
              onClick={this.props.handleCancel}
              color='primary'
              variant='outlined'
            >
              Отмена
            </Button>
          </TableCell>
        </TableRow>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.templates.itemsOfCurrentInvoice,
    cells: state.templates.cells,
  }
}

export default connect(mapStateToProps)(SelectItem)
