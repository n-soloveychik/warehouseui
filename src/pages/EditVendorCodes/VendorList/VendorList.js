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
  'WL4567.1875.0000',
  'WL4567.2875.0000',
  'WL4567.3875.0000',
  'WL4567.4875.0000',
  'WL4567.5875.0000',
  'WL4567.6875.0000',
  'WL4567.7875.0000',
  'WL4567.8875.0000',
  'WL4567.9875.0000',
  'WL4567.9870.0000',
  'WL4567.9175.0000',
  'WL4567.9275.0000',
  'WL4567.9375.0000',
  'WL4567.9475.0000',
  'WL4567.9575.0000',
  'WL4567.9675.0000',
  'WL4567.9775.0000',
  'WL4567.9875.0000',
  'WL4567.9975.0000',
  'WL4567.9075.0000',
  'WL4567.9875.0000',
  'WL4567.9815.0000',
  'WL4567.9825.0000',
  'WL4567.9835.0000',
  'WL4567.9845.0000',
  'WL4567.9855.0000',
  'WL4567.9865.0000',
  'WL4567.9875.0000',
  'WL4567.9885.0000',
  'WL4567.9895.0000',
  'WL4567.9805.0000',
  'WL4567.9871.0000',
  'WL4567.9872.0000',
  'WL4567.9873.0000',
  'WL4567.9874.0000',
  'WL4567.9875.0000',
  'WL4567.9876.0000',
  'WL4567.9877.0000',
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
          <IconButton
            onClick={() => this.props.openItems(code)}
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
