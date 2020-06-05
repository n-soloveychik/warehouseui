import React from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import classes from './CList.module.scss'
import { isMobile } from 'react-device-detect'

const statusColors = {
  1: {
    backgroundColor: '#ffffff20',
  },
  2: {
    backgroundColor: '#ffff0020',
  },
  3: {
    backgroundColor: '#ff000020',
  },
  4: {
    backgroundColor: '#00ff0020',
  },
}

const CList = (props) => {
  const style = {
    title: {
      marginBottom: 16,
    },
    item: {
      marginBottom: 10,
    },
  }
  const items = props.items.map((item, index) => {
    const className = [classes.item]
    if (
      props.currentItem &&
      props.currentItem === item[props.keyDetectCurrent]
    ) {
      className.push(classes['item--current'])
    }
    if (isMobile) {
      className.push(classes['item--mobile'])
    }
    return (
      <ListItem
        onClick={() => props.handleItemClick(item)}
        className={className.join(' ')}
        key={index}
        style={statusColors[item.status_id]}
      >
        {item[props.keyToRender]}
      </ListItem>
    )
  })

  return (
    <>
      <Typography variant={isMobile ? 'subtitle1' : 'h5'} style={style.title}>
        {props.title}
      </Typography>
      <List className={classes.paper}>{items}</List>
    </>
  )
}

export default CList
