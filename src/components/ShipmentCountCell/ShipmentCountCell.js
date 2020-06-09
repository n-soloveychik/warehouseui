import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import classes from './ShipmentCountCell.module.scss'
import { warehouseActions } from '@/redux/actions/actions'
import { isMobileOnly } from 'react-device-detect'

const config = () => {
  if (isMobileOnly)
    return {
      mainContainerClass: `${classes.row} ${classes['row--main']}`,
      typographyVariant: 'h5',
    }
  return {
    mainContainerClass: classes.column,
    typographyVariant: 'body1',
  }
}

const ComingCountCell = (props) => {
  const count_shipment =
    props.item.new_count_shipment ?? props.item.count_shipment

  const disabledIncrease =
    props.item.new_count_shipment !== undefined
      ? props.item.new_count_shipment >= props.item.count_in_stock
      : props.item.count_shipment >= props.item.count_in_stock

  const disabledDecrease =
    props.item.new_count_shipment !== undefined
      ? props.item.new_count_shipment === 0 ||
        props.item.new_count_shipment === 0
      : props.item.count_shipment === 0 || props.item.count_shipment === 0

  const setAll = () =>
    props.setItemNewCountShipment(props.item.item_id, props.item.count_in_stock)

  return (
    <div className={config().mainContainerClass}>
      <div className={classes.row}>
        <IconButton
          onClick={() =>
            props.setItemNewCountShipment(
              props.item.item_id,
              (props.item.new_count_shipment ?? props.item.count_shipment) - 1
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
        >
          {`${count_shipment} / `}{' '}
          <span onClick={() => setAll()}>{props.item.count_in_stock}</span>
        </Typography>
        <IconButton
          onClick={() =>
            props.setItemNewCountShipment(
              props.item.item_id,
              (props.item.new_count_shipment ?? props.item.count_shipment) + 1
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
            props.item.new_count_shipment === undefined ||
            props.item.new_count_shipment === props.item.count_shipment
          }
          onClick={() =>
            props.setItemNewCountShipment(
              props.item.item_id,
              props.item.count_shipment
            )
          }
        >
          <ClearIcon />
        </IconButton>
        <IconButton
          disabled={
            props.item.new_count_shipment === undefined ||
            props.item.new_count_shipment === props.item.count_shipment
          }
          onClick={() =>
            props.setItemCountShipment(
              props.item.item_id,
              props.item.new_count_shipment
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
    setItemNewCountShipment: (itemId, newCountShipment) =>
      warehouseActions.item.newCountShipment.set(
        dispatch,
        itemId,
        newCountShipment
      ),
    setItemCountShipment: (itemId, countShipment) =>
      warehouseActions.item.countShipment.set(dispatch, itemId, countShipment),
  }
}

export default connect(null, mapDispatchToProps)(ComingCountCell)
