import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EditIcon from '@material-ui/icons/Edit'
import classes from './InvoiceList.module.scss'

const style = {
  list: {
    height: window.innerHeight - 200,
  },
}

const InvoiceList = (props) => {
  const [perPage] = useState(Math.floor((style.list.height - 16) / 48))

  const [currentPage, setCurrentPage] = useState(1)

  const searchedInvoiceTemplates = props.invoiceTemplates.filter((invoice) =>
    invoice.invoice_code.includes(props.search),
  )

  const pages = Math.ceil(searchedInvoiceTemplates.length / perPage)

  const handleChange = (event, page) => {
    setCurrentPage(page)
  }

  // if (currentPage > pages) {
  //   setCurrentPage(1)
  // }

  const items = searchedInvoiceTemplates
    .slice((currentPage - 1) * perPage, currentPage * perPage)
    .map((invoiceTemplete, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <AssignmentIcon />
        </ListItemAvatar>
        <ListItemText primary={invoiceTemplete.invoice_code} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => props.openItems(invoiceTemplete.invoice_id)}
            edge='end'
            aria-label='delete'
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  return (
    <>
      <List style={style.list} className={classes.list}>
        {items}
      </List>
      <Pagination
        className={classes.pagination}
        style={style.pagination}
        count={pages}
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </>
  )
}

export default InvoiceList
