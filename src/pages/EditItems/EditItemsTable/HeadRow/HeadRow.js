import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const HeadRow = ({ titles }) => {
  return (
    <TableHead>
      <TableRow>
        {titles &&
          titles.map((title, index) => (
            <TableCell key={index}>{title}</TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

export default HeadRow
