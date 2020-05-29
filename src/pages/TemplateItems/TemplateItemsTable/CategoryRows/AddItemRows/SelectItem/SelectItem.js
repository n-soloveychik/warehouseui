import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell, Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { REQUEST } from '@/api'

class SelectItem extends Component {
  state = {
    currentItem: {},
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
    console.log(this.props)
    if (!this.props.category_id) {
      return
    }
    let response = await REQUEST.getItemsOfCategory(this.props.category_id)
    let options = response.data
    options = options.filter(
      (item) =>
        !this.props.items.find(
          (i) => i.item_num === item.item_num || i.item_id === item.item_id,
        ),
    )
    this.setState({ options })
  }

  setCurrentItem = (item) => {
    this.setState({
      currentItem: item || {},
    })
  }

  render() {
    console.log(this.state.options)
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
              ) : (
                this.state.currentItem[cell.name]
              )}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell
            colSpan={this.props.cells.length}
            style={{ textAlign: 'center' }}
          >
            <Button
              disabled={!this.state.currentItem.item_id}
              onClick={() => this.props.handleOk(this.state.currentItem)}
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
