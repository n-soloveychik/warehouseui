import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import CheckItemsCard from './CheckItemsCard/CheckItemsCard'
import classes from './CheckItemsCategoryCards.module.scss'

class CheckItemsCategoryCards extends Component {
  render() {
    console.log(this.props.category)
    return (
      <div>
        <Typography variant='subtitle1' className={classes['category-title']}>
          {this.props.category.category}
        </Typography>
        {this.props.category.lots.map((lot) => (
          <div style={{ zIndex: -1 }} key={lot.name}>
            <Typography className={classes['lot-title']}>
              Место: {lot.name}
            </Typography>
            {lot.items.map((item) => (
              <CheckItemsCard
                key={`${item.item_id}-${item.item_num}`}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default CheckItemsCategoryCards
