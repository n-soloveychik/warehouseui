import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, TableBody } from '@material-ui/core'
import HeadRow from './HeadRow/HeadRow'
import CategoryRows from './CategoryRows/CategoryRows'
import NewCategory from './NewCategory/NewCategory'
import { editItemsGetter } from '@/redux/getters/itemsGetters'

const cells = [
  {
    title: 'Артикул',
    name: 'itemNum',
    type: 'string',
    required: true,
    default: '',
    minLength: 0,
    maxLength: 1000,
  },
  {
    title: 'Изображение',
    name: 'image',
    type: 'image',
    required: false,
    default: '',
  },
  {
    title: 'Размер',
    name: 'size',
    type: 'string',
    required: true,
    default: '',
    minLength: 0,
    maxLength: 1000,
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
    maxLength: 1000,
  },
]

class EditItemsTable extends Component {
  state = {
    newCategory: null,
  }

  componentDidUpdate = () => {
    if (
      this.state.newCategory &&
      this.props.groupedItems.find(
        (category) => category.categoryId === this.state.newCategory.categoryId,
      )
    ) {
      this.setState({ newCategory: null })
    }
  }

  setNewCategory = (newCategory) => {
    this.setState({ newCategory: { ...newCategory, items: [] } })
  }

  createItem = (item) => {
    this.props.createItem(item)
  }

  render() {
    return (
      <Table size='small'>
        <HeadRow
          titles={
            (!!cells && !!cells.length && cells.map((cell) => cell.title)) || []
          }
        />
        <TableBody>
          {this.props.groupedItems.map((category, index) => (
            <CategoryRows
              create={this.createItem}
              key={index}
              cells={cells}
              category={category}
            />
          ))}
          {!!this.props.newCategory?.category ? (
            <CategoryRows
              create={this.createItem}
              cells={cells}
              category={this.props.newCategory}
            />
          ) : (
            <NewCategory
              categories={this.props.categories}
              getCategory={this.setNewCategory}
              cells={cells}
            />
          )}
        </TableBody>
      </Table>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupedItems: editItemsGetter(
      state.templates.itemsOfCurrentVendor,
      state.templates.categories,
    ),
    newCategory: state.templates.newCategory,
  }
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemsTable)
