import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Badge,
} from '@material-ui/core'
import classes from './CheckItemsTable.module.scss'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'

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
  const tableBody =
    props.data &&
    props.data.map((category, index) => {
      const titleRow = (
        <TableRow style={{ position: 'sticky' }} key={index}>
          <TableCell
            style={{ padding: 0, textAlign: 'center' }}
            className={classes['single-cell']}
            colSpan='9'
          >
            <Typography variant='subtitle1'>{category.category}</Typography>
          </TableCell>
        </TableRow>
      )
      const categoryRows = category.lots.map((lot, index) =>
        lot.items.map((item, itemIndex) => (
          <TableRow style={styles[item.statusId]} key={`${index}-${itemIndex}`}>
            {itemIndex === 0 && (
              <TableCell
                rowSpan={lot.items.length}
                style={{ textAlign: 'center', background: 'white' }}
              >
                {lot.name}
              </TableCell>
            )}
            <TableCell style={{ textAlign: 'center' }}>
              {item.itemNum}
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.image}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.size}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.count}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{item.weight}</TableCell>
            <TableCell>
              <Typography variant={'caption'}>{item.description}</Typography>
            </TableCell>
            <TableCell style={{ padding: '6px 0', maxWidth: 51 }}>
              {item.statusId !== 1 ? (
                <IconButton
                  onClick={() =>
                    props.updateStatus({ itemId: item.itemId, statusId: 1 })
                  }
                  size={'small'}
                >
                  <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() =>
                    props.updateStatus({ itemId: item.itemId, statusId: 2 })
                  }
                  size={'small'}
                >
                  <CheckBoxIcon></CheckBoxIcon>
                </IconButton>
              )}
            </TableCell>
            <TableCell style={{ padding: '6px 0', maxWidth: 51 }}>
              <IconButton
                onClick={(e) => props.contextMenuButtonClick(item, e.target)}
                size={'small'}
              >
                <Badge badgeContent={item.itemclaimsList.length} color='error'>
                  <ReportProblemIcon />
                </Badge>
              </IconButton>
            </TableCell>
          </TableRow>
        )),
      )
      const res = [titleRow, categoryRows].flat(Infinity)
      return res
    })
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
        <TableBody>{tableBody}</TableBody>
      </Table>
    </>
  )
}

export default CTable
