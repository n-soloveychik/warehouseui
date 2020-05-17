import React, { Component } from 'react'
import { TableRow, TableCell, Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class SelectItem extends Component {
  state = {
    currentItem: {},
  }

  setCurrentItem = (itemNum) => {
    this.setState({
      currentItem: itemNum
        ? this.props.items.find((item) => item.itemNum === itemNum)
        : {},
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
                  options={this.props.itemNums}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Артикул товара'
                      variant='outlined'
                    />
                  )}
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
              onClick={this.props.handleOk}
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

export default SelectItem
