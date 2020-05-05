import React from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import classes from './CList.module.scss'

const CList = (props) => {
  const items = props.items.map((item, index) => {
    const className = [classes.item]
    if (props.currentItem === item) {
      className.push(classes['item--current'])
    }
    return (
      <ListItem
        onClick={() => props.handleItemClick(item)}
        className={className.join(' ')}
        key={index}
      >
        {item}
      </ListItem>
    )
  })

  return (
    <>
      <Typography variant='h5' style={{ marginBottom: 16 }}>
        {props.title}
      </Typography>
      <List className={classes.paper}>{items}</List>
    </>
  )
}

export default CList
