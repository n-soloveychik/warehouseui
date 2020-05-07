import React from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import classes from './CList.module.scss'
import { Skeleton } from '@material-ui/lab'

const CList = (props) => {
  const style = {
    title: {
      marginBottom: 16,
    },
    item: {
      marginBottom: 10,
    },
  }

  const items = props.loading
    ? [...Array(20)].map((el, index) => (
        <Skeleton style={style.item} key={index} width={100} height={20} />
      ))
    : props.items.map((item, index) => {
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
      {props.loading ? (
        <Skeleton variant='rect' style={style.title} width={150} height={20} />
      ) : (
        <Typography variant='h5' style={style.title}>
          {props.title}
        </Typography>
      )}
      <List className={classes.paper}>{items}</List>
    </>
  )
}

export default CList