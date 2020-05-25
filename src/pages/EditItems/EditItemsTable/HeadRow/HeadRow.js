import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { connect } from 'react-redux'

const HeadRow = (props) => {
  return (
    <TableHead>
      <TableRow>
        {props.cells &&
          props.cells.map((cell, index) => (
            <TableCell key={index}>{cell.title}</TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  }
}

export default connect(mapStateToProps)(HeadRow)
