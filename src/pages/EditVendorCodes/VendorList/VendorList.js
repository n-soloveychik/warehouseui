import React, { Component } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EditIcon from '@material-ui/icons/Edit'
import classes from './VendorList.module.scss'

class VendorList extends Component {
  render() {
    const reversedList = this.props.vendorTemplates.reduce(
      (arr, cur) => [cur, ...arr],
      [],
    )
    const items = reversedList.map((vendorTemplete, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <AssignmentIcon />
        </ListItemAvatar>
        <ListItemText primary={vendorTemplete.vendorCode} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => this.props.openItems(vendorTemplete.vendorId)}
            edge='end'
            aria-label='delete'
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
    return <List className={classes.list}>{items}</List>
  }
}

export default VendorList
