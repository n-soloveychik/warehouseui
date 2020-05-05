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

const CTable = (props) => {
  const tableBody = this.props.data.map((str, index) => {
    if (str.type) {
      return (
        <TableRow style={{ position: 'sticky' }} key={index}>
          <TableCell
            style={{ padding: 0, textAlign: 'center' }}
            className={classes['single-cell']}
            colSpan='9'
          >
            <Typography variant='subtitle1'>{str.type}</Typography>
          </TableCell>
        </TableRow>
      )
    }
    return (
      <TableRow key={index}>
        <TableCell style={{ textAlign: 'center' }}>{str.place}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{str.articul}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{str.image}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{str.size}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{str.quantity}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{str.mass}</TableCell>
        <TableCell>
          <Typography variant={'caption'}>{str.comment}</Typography>
        </TableCell>
        <TableCell style={{ paddingRight: 0 }}>
          <IconButton size={'small'}>
            <DoneOutlineIcon></DoneOutlineIcon>
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton size={'small'}>
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  })
  return (
    <div style={{ height: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <Table style={{ height: 'auto' }} size='small'>
        <TableHead style={{ position: 'sticky', top: 0 }}>
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
