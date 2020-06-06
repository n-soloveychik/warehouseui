import React from 'react'
import { connect } from 'react-redux'
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Badge,
} from '@material-ui/core'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import classes from './CheckTableCategory.module.scss'
import { warehouseActions } from '@/redux/actions/actions'
import CountCell from '../../../../components/CountCell/CountCell'
import { itemStatusColors } from '@/configs/itemStatusColors'

const style = {
  statusColor: itemStatusColors,
}

const CheckTableCategory = (props) => {
  const itemClass = (item) => {
    return item.loading ? classes.loading : ''
  }

  const clickUpdateStatusHandler = (e, item) => {
    e.stopPropagation()
    if (item.new_count_in_stock === item.count) {
      props.setItemNewCountInStock(item.item_id, item.count_in_stock)
      return
    }
    props.setItemNewCountInStock(item.item_id, item.count)
  }

  const clickMultipleUpdateStatusHandler = (e, lot) => {
    const itemIds = lot.items.map((item) => item.item_id)
    e.stopPropagation()
    props.setMultipleFullInStock(itemIds)
  }

  const clickContextMenuHandler = (e, item) => {
    e.stopPropagation()
    props.contextMenuButtonClick(item, e.target)
  }

  const titleRow = (
    <TableRow key={props.category.category} style={{ position: 'sticky' }}>
      <TableCell
        style={{ padding: 0, textAlign: 'center' }}
        className={classes['single-cell']}
        colSpan='9'
      >
        <Typography variant='subtitle1'>{props.category.category}</Typography>
      </TableCell>
    </TableRow>
  )
  const categoryRows = props.category.lots.map((lot, index) =>
    lot.items.map((item, itemIndex) => (
      <TableRow
        className={classes.table_row}
        style={style.statusColor[item.status_id]}
        key={`${props.category.category}-${index}-${itemIndex}`}
      >
        {itemIndex === 0 && (
          <TableCell
            onClick={(e) => clickMultipleUpdateStatusHandler(e, lot)}
            rowSpan={lot.items.length}
            style={{ textAlign: 'center', background: 'white', opacity: 1 }}
          >
            {lot.name}
          </TableCell>
        )}
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: 'center' }}
        >
          {item.item_num}
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: 'center' }}
        >
          <img
            style={{ width: 100, height: 100, objectFit: 'contain' }}
            alt='продукт'
            src={item.image}
          />
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: 'center' }}
        >
          {item.size}
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          <CountCell item={item} />
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: 'center' }}
        >
          {item.weight}
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
        >
          <Typography variant={'caption'}>{item.description}</Typography>
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ padding: '6px 6px', maxWidth: 51 }}
        ></TableCell>
        <TableCell
          onClick={(e) => clickContextMenuHandler(e, item)}
          className={itemClass(item)}
          style={{ padding: '6px 6px', maxWidth: 51 }}
        >
          <IconButton
            onClick={(e) => clickContextMenuHandler(e, item)}
            size={'small'}
          >
            <Badge
              badgeContent={
                item.claims?.filter((claim) => !claim.closed)?.length || 0
              }
              color='error'
            >
              <ReportProblemIcon />
            </Badge>
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  )
  const res = [titleRow, categoryRows].flat(Infinity)
  return res
}

function mapDispatchToProps(dispatch) {
  return {
    setItemNewCountInStock: (itemId, newCountInStock) =>
      warehouseActions.item.newCountInStock.set(
        dispatch,
        itemId,
        newCountInStock
      ),
    setMultipleFullInStock: (itemIds) =>
      warehouseActions.items.setMultipleFullInStocks(dispatch, itemIds),
  }
}

export default connect(null, mapDispatchToProps)(CheckTableCategory)
