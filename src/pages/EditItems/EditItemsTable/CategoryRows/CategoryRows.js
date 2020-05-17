import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import NewItemRows from './AddItemRows/AddItemRows'

const CategoryRows = ({ cells, category }) => {
  return (
    <>
      <TableRow>
        <TableCell
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(170, 116, 0, 0.363)',
            padding: 0,
          }}
          colSpan={cells.length}
        >
          <Typography variant='subtitle1'>{category.category}</Typography>
        </TableCell>
      </TableRow>
      {category.items &&
        category.items.map((item, itemIndex) => (
          <TableRow key={itemIndex}>
            {cells.map((cell, cellIndex) => (
              <TableCell key={`${itemIndex}-${cellIndex}`}>
                {item[cell.name]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      <NewItemRows cells={cells} />
    </>
  )
}

export default CategoryRows
