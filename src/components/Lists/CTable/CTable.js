import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@material-ui/core'
import classes from './CTable.module.scss'

class CTable extends Component {
  render() {
    console.log(this.props)
    const tableBody = this.props.data.map((str) => {
      if (str.type) {
        return (
          <TableRow>
            <TableCell className={classes['single-cell']} colspan='9'>
              {str.type}
            </TableCell>
          </TableRow>
        )
      }
      return (
        <TableRow>
          <TableCell>{str.place}</TableCell>
          <TableCell>{str.articul}</TableCell>
          <TableCell>{str.image}</TableCell>
          <TableCell>{str.size}</TableCell>
          <TableCell>{str.quantity}</TableCell>
          <TableCell>{str.mass}</TableCell>
          <TableCell>{str.comment}</TableCell>
          <TableCell>
            <Button>Пришло</Button>
          </TableCell>
          <TableCell>
            <Button>Не пришло / Брак</Button>
          </TableCell>
        </TableRow>
      )
    })
    return (
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Место</TableCell>
            <TableCell>Артикул</TableCell>
            <TableCell>Изображение</TableCell>
            <TableCell>Размер</TableCell>
            <TableCell>Количество</TableCell>
            <TableCell>Масса</TableCell>
            <TableCell>Примечание</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    )
  }
}

export default CTable
