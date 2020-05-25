import React, { Component } from 'react'
import { Button, TableRow, TableCell } from '@material-ui/core'

class Buttons extends Component {
  render() {
    return (
      <TableRow>
        <TableCell
          colSpan={this.props.cells.length}
          style={{ textAlign: 'center' }}
        >
          <Button
            color='primary'
            style={{ marginRight: 30 }}
            onClick={this.props.showSelecting}
            variant='contained'
          >
            Добавить товар
          </Button>
          <Button
            color='primary'
            onClick={this.props.showCreating}
            variant='contained'
          >
            Новый товар
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}

export default Buttons
