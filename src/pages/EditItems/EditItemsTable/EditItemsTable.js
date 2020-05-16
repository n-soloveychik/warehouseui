import React, { Component } from 'react'
import { Table, TableBody } from '@material-ui/core'
import HeadRow from './HeadRow/HeadRow'
import CategoryRows from './CategoryRows/CategoryRows'
import NewCategory from './NewCategory/NewCategory'

const cells = [
  {
    title: 'Место',
    name: 'lot',
    type: 'string',
    required: true,
    default: '',
    minLength: 0,
    maxLength: 10,
  },
  {
    title: 'Артикул',
    name: 'itemNum',
    type: 'string',
    required: true,
    default: '',
    minLength: 0,
    maxLength: 10,
  },
  {
    title: 'Изображение',
    name: 'image',
    type: 'image',
    required: true,
    default: '',
  },
  {
    title: 'Размер',
    name: 'size',
    type: 'string',
    required: true,
    default: '',
    minLength: 0,
    maxLength: 10,
  },
  {
    title: 'Кол-во',
    name: 'count',
    type: 'number',
    required: true,
    default: 0,
    min: 1,
    max: 10000,
  },
  {
    title: 'Масса',
    name: 'weight',
    type: 'float',
    required: true,
    default: 0,
    min: 0.001,
    max: 10000,
  },
  {
    title: 'Примечание',
    name: 'description',
    type: 'string',
    required: false,
    default: '',
    minLength: 0,
    maxLength: 10,
  },
]

class EditItemsTable extends Component {
  state = {
    newCategory: null,
  }

  setNewCategory = (newCategory) => {
    this.setState({ newCategory: { ...newCategory, items: [] } })
  }

  render() {
    // console.log(this.props.groupedItems)
    return (
      <Table size='small'>
        <HeadRow
          titles={
            (!!cells && !!cells.length && cells.map((cell) => cell.title)) || []
          }
        />
        <TableBody>
          {this.props.groupedItems.map((item, index) => (
            <CategoryRows key={index} cells={cells} category={item} />
          ))}
          {this.state.newCategory ? (
            <CategoryRows cells={cells} category={this.state.newCategory} />
          ) : (
            <NewCategory getCategory={this.setNewCategory} cells={cells} />
          )}
        </TableBody>
      </Table>
    )
  }
}

export default EditItemsTable
