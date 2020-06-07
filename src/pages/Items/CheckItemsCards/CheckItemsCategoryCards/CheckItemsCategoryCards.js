import React from 'react'
import { Typography } from '@material-ui/core'
import CheckItemsCard from './CheckItemsCard/CheckItemsCard'
import classes from './CheckItemsCategoryCards.module.scss'
import { connect } from 'react-redux'
import { warehouseActions } from '@/redux/actions/actions'

const CheckItemsCategoryCards = (props) => {
  return (
    <div>
      <Typography variant='subtitle1' className={classes['category-title']}>
        {props.category.category}
      </Typography>
      {props.category.lots.map((lot) => (
        <div style={{ zIndex: -1 }} key={lot.name}>
          <Typography
            onClick={() =>
              props.setMultipleFullInStock(
                lot.items.map((item) => item.item_id)
              )
            }
            className={classes['lot-title']}
          >
            Место: {lot.name}
          </Typography>
          {lot.items.map((item) => (
            <CheckItemsCard
              contextMenuButtonClick={props.contextMenuButtonClick}
              key={`${item.item_id}-${item.item_num}`}
              item={item}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    setMultipleFullInStock: (itemIds) =>
      warehouseActions.items.setMultipleFullInStocks(dispatch, itemIds),
  }
}

export default connect(null, mapDispatchToProps)(CheckItemsCategoryCards)
