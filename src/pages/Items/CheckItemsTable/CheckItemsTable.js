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

const style = {
  th: {
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 3,
  },
}

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
            <TableCell style={style.th}>Место</TableCell>
            <TableCell style={style.th}>Артикул</TableCell>
            <TableCell style={style.th}>Изображение</TableCell>
            <TableCell style={style.th}>Размер</TableCell>
            <TableCell style={style.th}>Поступило</TableCell>
            <TableCell style={style.th}>Масса</TableCell>
            <TableCell style={style.th}>Отгружено</TableCell>
            <TableCell style={style.th}></TableCell>
            <TableCell style={style.th}></TableCell>
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
