import React from 'react'
import { TableRow, TableCell, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import AddItemRows from './AddItemRows/AddItemRows'
import classes from './CategoryRows.module.scss'

const CategoryRows = (props) => {
  const addCategoryToItem = (item) => ({
    ...item,
    categoryId: props.category.categoryId,
    category: props.category.category,
  })

  const createItem = (item) => props.create(addCategoryToItem(item))

  return (
    <>
      <TableRow>
        <TableCell
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(170, 116, 0, 0.363)',
            padding: 0,
          }}
          colSpan={props.cells.length}
        >
          <Typography variant='subtitle1'>{props.category.category}</Typography>
        </TableCell>
      </TableRow>
      {props.category.items &&
        props.category.items.map((item, itemIndex) => (
          <TableRow key={itemIndex}>
            {props.cells.map((cell, cellIndex) => (
              <TableCell style={cell.style} key={`${itemIndex}-${cellIndex}`}>
                {cell.name === 'image' ? (
                  <img
                    className={classes.image}
                    src={'http://iopk.in' + item[cell.name]}
                    alt={item.itemNum}
                  />
                ) : cell.output ? (
                  cell.output(item[cell.name])
                ) : (
                  item[cell.name]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      <AddItemRows
        category={{
          categoryId: props.category.categoryId,
          category: props.category.category,
        }}
        create={createItem}
        cells={props.cells}
      />
    </>
  )
}

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  }
}

export default connect(mapStateToProps)(CategoryRows)
