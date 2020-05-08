import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import classes from './CTable.module.scss'

const styles = {
  1: {
    backgroundColor: '#00ff0020',
  },
  2: {
    backgroundColor: '#ffffff20',
  },
  3: {
    backgroundColor: '#ff000020',
  },
}

const CTable = (props) => {
  const tableBody = props.data.map((category, index) => {
    const titleRow = (
      <TableRow style={{ position: 'sticky' }} key={index}>
        <TableCell
          style={{ padding: 0, textAlign: 'center' }}
          className={classes['single-cell']}
          colSpan='9'
        >
          <Typography variant='subtitle1'>{category.name}</Typography>
        </TableCell>
      </TableRow>
    )
    const categoryRows = category.lots.map((lot, index) =>
      lot.items.map((item, itemIndex) => (
        <TableRow style={styles[item.statusId]} key={`${index}-${itemIndex}`}>
          {itemIndex === 0 && (
            <TableCell
              rowSpan={lot.items.length}
              style={{ textAlign: 'center' }}
            >
              {lot.name}
            </TableCell>
          )}
          <TableCell style={{ textAlign: 'center' }}>
            {item.vendor_code}
          </TableCell>
          <TableCell style={{ textAlign: 'center' }}>{item.image}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>{item.size}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>{item.count}</TableCell>
          <TableCell style={{ textAlign: 'center' }}>{item.weight}</TableCell>
          <TableCell>
            <Typography variant={'caption'}>{item.description}</Typography>
          </TableCell>
          <TableCell style={{ paddingRight: 0 }}>
            <IconButton
              onClick={() =>
                props.updateStatus({ itemId: item.itemId, statusId: 1 })
              }
              size={'small'}
            >
              <DoneOutlineIcon></DoneOutlineIcon>
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              onClick={() =>
                props.updateStatus({ itemId: item.itemId, statusId: 3 })
              }
              size={'small'}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )),
    )
    const res = [titleRow, categoryRows].flat(Infinity)
    return res
  })
  return (
    <div style={{ height: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <Table style={{ height: 'auto' }} size='small'>
        <TableHead
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        >
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>Место</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Артикул</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Изображение</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Размер</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Кол-во</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Масса</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Примечание</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </div>
  )
}

export default CTable
