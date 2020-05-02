import React, {Component} from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper} from '@material-ui/core'
import classes from './Warehouse.module.scss'

class Warehouse extends Component {

  render() {
    return (
      <TableContainer component={Paper} className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата приёма</TableCell>
              <TableCell>Номер договора</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>19.04.16</TableCell>
              <TableCell>56462</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>19.04.16</TableCell>
              <TableCell>56462</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>19.04.16</TableCell>
              <TableCell>56462</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>19.04.16</TableCell>
              <TableCell>56462</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>19.04.16</TableCell>
              <TableCell>56462</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}


export default Warehouse