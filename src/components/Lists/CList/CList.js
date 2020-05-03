import React, { Component } from 'react'
import { List, ListItem, Paper } from '@material-ui/core'
import classes from './CList.module.scss'

class CList extends Component {
  render() {
    const items = this.props.items.map((item, index) => {
      const className = [classes.item]
      if (this.props.currentItem === item) {
        className.push(classes['item--current'])
      }
      return (
        <ListItem
          onClick={() => this.props.handleItemClick(item)}
          className={className.join(' ')}
          key={index}
        >
          {item}
        </ListItem>
      )
    })

    return <List className={classes.paper}>{items}</List>
  }
}

export default CList
