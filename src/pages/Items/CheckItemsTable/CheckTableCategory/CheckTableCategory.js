import React from 'react'
import { connect } from 'react-redux'
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Badge,
} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import classes from './CheckTableCategory.module.scss'
import { warehouseActions } from '@/redux/actions/actions'

const CheckTableCategory = (props) => {
  const updateItemStatus = (item) => {
    if (item.status_id === 2) {
      props.setStatusAwaitDelivery(item.item_id)
    }
    if (item.status_id === 1) {
      props.setStatusInStock(item.item_id)
    }
  }

  const itemClass = (item) => {
    const statusClasses = {
      1: 'status--await-delivery',
      2: 'status--in-stock',
      3: 'status--claim',
    }
    let result = []
    item.loading && result.push(classes.loading)
    result.push(classes[statusClasses[item.newStatusId || item.status_id]])
    return result.join(' ')
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
      <TableRow key={`${props.category.category}-${index}-${itemIndex}`}>
        {itemIndex === 0 && (
          <TableCell
            rowSpan={lot.items.length}
            style={{ textAlign: 'center', background: 'white', opacity: 1 }}
          >
            {lot.name}
          </TableCell>
        )}
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          {item.item_num}
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          <img
            style={{ width: 100, height: 100, objectFit: 'contain' }}
            alt='продукт'
            src={item.image}
          />
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          {item.size}
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          {item.count}
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: 'center' }}>
          {item.weight}
        </TableCell>
        <TableCell className={itemClass(item)}>
          <Typography variant={'caption'}>{item.description}</Typography>
        </TableCell>
        <TableCell
          className={itemClass(item)}
          style={{ padding: '6px 6px', maxWidth: 51 }}
        >
          <IconButton onClick={() => updateItemStatus(item)} size={'small'}>
            {(item.newStatusId || item.status_id) !== 2 ? (
              <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
            ) : (
              <CheckBoxIcon></CheckBoxIcon>
            )}
          </IconButton>
        </TableCell>
        <TableCell
          className={itemClass(item)}
          style={{ padding: '6px 6px', maxWidth: 51 }}
        >
          <IconButton
            onClick={(e) => props.contextMenuButtonClick(item, e.target)}
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
    )),
  )
  const res = [titleRow, categoryRows].flat(Infinity)
  return res
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    setStatusInStock: (itemId) =>
      warehouseActions.items.status.setInStock(dispatch, itemId),
    setStatusAwaitDelivery: (itemId) =>
      warehouseActions.items.status.setAwaitDelivery(dispatch, itemId),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckTableCategory)
