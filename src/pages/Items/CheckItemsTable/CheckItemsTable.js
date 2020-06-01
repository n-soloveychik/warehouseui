import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { checkItemsGetter } from '@/redux/getters/itemsGetters'
import CheckTableCategory from './CheckTableCategory/CheckTableCategory'

const CTable = (props) => {
  return (
    <>
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
        <TableBody>
          {props.table?.map((category, index) => (
            <CheckTableCategory
              contextMenuButtonClick={props.contextMenuButtonClick}
              category={category}
              key={index}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}

function mapStateToProps(state) {
  return {
    table: checkItemsGetter(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CTable)
