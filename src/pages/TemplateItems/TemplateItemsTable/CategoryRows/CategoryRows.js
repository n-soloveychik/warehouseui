import React from 'react'
import { TableRow, TableCell, Typography, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { connect } from 'react-redux'
import AddItemRows from './AddItemRows/AddItemRows'
import { templateActions, errorActions } from '@/redux/actions/actions'
import { REQUEST } from '@/api'
import EditShow from './EditShow/EditShow'
import SendImage from './SendImage/SendImage'

const removeItem = async (invoiceId, itemId, updateItems, showError) => {
  let response = await REQUEST.removeTemplateItemFromInvoice(invoiceId, itemId)
  if (response.status < 200 && response.status > 299) {
    showError(response.status, response.data.message)
    return
  }
  updateItems(invoiceId)
}

const CategoryRows = (props) => {
  return (
    <>
      <TableRow>
        <TableCell
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(170, 116, 0, 0.363)',
            padding: 0,
          }}
          colSpan={props.cells.length + 1}
        >
          <Typography variant='subtitle1'>
            {props.category.category_name}
          </Typography>
        </TableCell>
      </TableRow>
      {props.category.items &&
        props.category.items.map((item, itemIndex) => (
          <TableRow key={`${item.item_num}-${itemIndex}`}>
            {props.cells.map((cell, cellIndex) => (
              <TableCell
                style={cell.style}
                key={`${item.item_num}-${cellIndex}`}
              >
                {cell.type === 'image' ? (
                  <SendImage
                    itemId={item.item_id}
                    invoiceId={props.invoiceId}
                    src={item.image}
                    alt={item.item_num}
                  />
                ) : (
                  <EditShow
                    invoiceId={+props.invoiceId}
                    item={item}
                    cell={cell}
                  />
                )}
              </TableCell>
            ))}
            <TableCell>
              <IconButton
                onClick={() =>
                  removeItem(
                    props.invoiceId,
                    item.item_id,
                    props.updateItems,
                    props.showError,
                  )
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      <AddItemRows
        category={{
          category_id: props.category.category_id,
          category_name: props.category.category_name,
        }}
      />
    </>
  )
}

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    showError: (title, text) => errorActions.showError(dispatch, title, text),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRows)
