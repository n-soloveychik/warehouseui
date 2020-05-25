import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell, Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { grpc } from '@/grpc'

class SelectItem extends Component {
  state = {
    currentItem: {},
    options: [],
  }

  componentDidMount = async () => {
    if (!this.props.categoryId) {
      return
    }
    let options = await grpc.template.item.getByCategory(this.props.categoryId)
    options = options.filter(
      (item) =>
        !this.props.items.find(
          (i) => i.itemNum === item.itemNum || i.itemId === item.itemId,
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
    return (
      <>
        <TableRow>
          {this.props.cells.map((cell, index) => (
            <TableCell key={index}>
              {cell.name === 'itemNum' ? (
                <Autocomplete
                  onChange={(event, newValue) => this.setCurrentItem(newValue)}
                  options={this.state.options}
                  getOptionLabel={(option) => option.itemNum}
                  renderInput={(params) => (
                    <TextField
                      {...params}
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
                  src={'http://iopk.in/' + this.state.currentItem[cell.name]}
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
              disabled={!this.state.currentItem.itemId}
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
    items: state.templates.itemsOfCurrentVendor,
  }
}

export default connect(mapStateToProps)(SelectItem)
