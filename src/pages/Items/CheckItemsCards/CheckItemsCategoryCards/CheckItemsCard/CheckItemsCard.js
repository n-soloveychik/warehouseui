import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  // CardContent,
  // Paper,
  IconButton,
  Typography,
  Badge,
} from '@material-ui/core'
import classes from './CheckItemsCard.module.scss'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import ClearIcon from '@material-ui/icons/Clear'
import { warehouseActions } from '@/redux/actions/actions'

const style = {
  card: {
    boxShadow: '0 0 2px 0',
    margin: '30px 16px',
  },
  image: {
    backgroundSize: 'contain',
  },
  doneButton: {
    position: 'absolute',
    right: 16,
  },
  report: {},
  status: {
    1: {},
    2: { backgroundColor: '#ffff0020' },
    3: { backgroundColor: '#00ff0020' },
    4: { backgroundColor: '#ff000020' },
  },
}

const CheckItemsCard = (props) => {
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
  const handleImageClick = () => {
    if (props.item.new_count_in_stock === props.item.count) {
      props.setItemNewCountInStock(
        props.item.item_id,
        props.item.count_in_stock
      )
      return
    }
    props.setItemNewCountInStock(props.item.item_id, props.item.count)
  }
  return (
    <Card style={{ ...style.card, ...style.status[props.item.status_id] }}>
      <CardHeader
        title={props.item.item_num}
        action={
          <IconButton
            onClick={(e) => props.contextMenuButtonClick(props.item, e.target)}
            style={style.report}
          >
            <Badge
              badgeContent={
                props.item.claims?.filter((claim) => !claim.closed)?.length || 0
              }
              color='error'
            ></Badge>
            <ReportProblemIcon />
          </IconButton>
        }
      />
      <CardMedia
        onClick={handleImageClick}
        style={style.image}
        className={classes.image}
        image={props.item.image}
      />
      <CardActions>
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
        <Typography variant='h4'>{`${
          props.item.new_count_in_stock ?? props.item.count_in_stock
        } / ${props.item.count}`}</Typography>
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
        <div style={style.doneButton}>
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
      </CardActions>
    </Card>
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

export default connect(null, mapDispatchToProps)(CheckItemsCard)
