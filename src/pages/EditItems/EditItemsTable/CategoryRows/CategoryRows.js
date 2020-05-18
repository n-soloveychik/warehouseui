import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import AddItemRows from './AddItemRows/AddItemRows'
import classes from './CategoryRows.module.scss'

const CategoryRows = ({ cells, category, create }) => {
  const addCategoryToItem = (item) => ({
    ...item,
    categoryId: category.categoryId,
    category: category.category,
  })

  const createItem = (item) => create(addCategoryToItem(item))

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
                {cell.name === 'image' ? (
                  <img
                    className={classes.image}
                    src={'http://iopk.in/' + item[cell.name]}
                    alt={item.itemNum}
                  />
                ) : (
                  item[cell.name]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      <AddItemRows
        category={{
          categoryId: category.categoryId,
          category: category.category,
        }}
        create={createItem}
        cells={cells}
      />
    </>
  )
}

export default CategoryRows
