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

const vendorCodes = [
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
  'WL4567.9875.0000',
]

class VendorList extends Component {
  render() {
    const items = vendorCodes.map((code, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <AssignmentIcon />
        </ListItemAvatar>
        <ListItemText primary={code} />
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='delete'>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
    return <List className={classes.list}>{items}</List>
  }
}

export default VendorList
