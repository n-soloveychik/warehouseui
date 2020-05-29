import React, { Component } from 'react'
import { Button, TableRow, TableCell } from '@material-ui/core'
import { connect } from 'react-redux'

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

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  }
}

export default connect(mapStateToProps)(Buttons)
