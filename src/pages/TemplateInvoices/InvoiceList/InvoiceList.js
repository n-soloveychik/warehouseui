import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import EditIcon from '@material-ui/icons/Edit'
import classes from './InvoiceList.module.scss'

const style = {
  list: {
    height: window.innerHeight - 264,
  },
}

const InvoiceList = (props) => {
  const [perPage] = useState(Math.floor((style.list.height - 16) / 48) * 2)

  const [currentPage, setCurrentPage] = useState(1)

  const searchedInvoiceTemplates = props.invoiceTemplates.filter((invoice) =>
    invoice.invoice_code.includes(props.search),
  )

  const pages = Math.ceil(searchedInvoiceTemplates.length / perPage)

  const handleChange = (event, page) => {
    setCurrentPage(page)
  }

  if (pages > 0 && currentPage > pages) {
    setCurrentPage(1)
  }

  const items = (n) => {
    return searchedInvoiceTemplates
      .slice((currentPage - 1) * perPage, currentPage * perPage)
      .slice((perPage / 2) * n, (perPage / 2) * n + perPage / 2)
      .map((invoiceTemplete, index) => (
        <ListItem key={index}>
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
  }
  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <List style={style.list} className={classes.list}>
            {items(0)}
          </List>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <List style={style.list} className={classes.list}>
            {items(1)}
          </List>
        </Grid>
      </Grid>
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
