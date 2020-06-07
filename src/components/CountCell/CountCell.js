import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import classes from './CountCell.module.scss'
import { warehouseActions } from '@/redux/actions/actions'
import { isMobileOnly } from 'react-device-detect'

const config = () => {
  if (isMobileOnly)
    return {
      mainContainerClass: `${classes.row} ${classes['row--main']}`,
      typographyVariant: 'h4',
    }
  return {
    mainContainerClass: classes.column,
    typographyVariant: 'body1',
  }
}

const CountCell = (props) => {
  const count_in_stock =
    props.item.new_count_in_stock ?? props.item.count_in_stock

  const disabledIncrease =
    props.item.new_count_in_stock !== undefined
      ? props.item.new_count_in_stock >= props.item.count
      : props.item.count_in_stock >= props.item.count
  const disabledDecrease =
    props.item.new_count_in_stock !== undefined
      ? Boolean(
          props.item.new_count_in_stock === 0 ||
            (props.item.new_count_in_stock === 1 && props.item.claims.length)
        )
      : Boolean(
          props.item.count_in_stock === 0 ||
            (props.item.count_in_stock === 1 && props.item.claims.length)
        )
  return (
    <div className={config().mainContainerClass}>
      <div className={classes.row}>
        <IconButton
          onClick={() =>
            props.setItemNewCountInStock(
              props.item.item_id,
              (props.item.new_count_in_stock ?? props.item.count_in_stock) - 1
            )
          }
          disabled={disabledDecrease}
          color='primary'
        >
          <RemoveIcon />
        </IconButton>
        <Typography
          style={{ whiteSpace: 'nowrap' }}
          variant={config().typographyVariant}
        >{`${count_in_stock} / ${props.item.count}`}</Typography>
        <IconButton
          onClick={() =>
            props.setItemNewCountInStock(
              props.item.item_id,
              (props.item.new_count_in_stock ?? props.item.count_in_stock) + 1
            )
          }
          disabled={disabledIncrease}
          color='primary'
        >
          <AddIcon />
        </IconButton>
      </div>
      <div>
        <IconButton
          color='primary'
          disabled={
            props.item.new_count_in_stock === undefined ||
            props.item.new_count_in_stock === props.item.count_in_stock
          }
          onClick={() =>
            props.setItemNewCountInStock(
              props.item.item_id,
              props.item.count_in_stock
            )
          }
        >
          <ClearIcon />
        </IconButton>
        <IconButton
          disabled={
            props.item.new_count_in_stock === undefined ||
            props.item.new_count_in_stock === props.item.count_in_stock
          }
          onClick={() =>
            props.setItemCountInStock(
              props.item.item_id,
              props.item.new_count_in_stock
            )
          }
          color='primary'
        >
          <DoneIcon />
        </IconButton>
      </div>
    </div>
  )
}
function mapDispatchToProps(dispatch) {
  return {
    setItemNewCountInStock: (itemId, newCountInStock) =>
      warehouseActions.item.newCountInStock.set(
        dispatch,
        itemId,
        newCountInStock
      ),
    setItemCountInStock: (itemId, countInStock) =>
      warehouseActions.item.countInStock.set(dispatch, itemId, countInStock),
  }
}

export default connect(null, mapDispatchToProps)(CountCell)
