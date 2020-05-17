import React, { Component } from 'react'
import { connect } from 'react-redux'
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
              showCreateItem={this.props.showCreateItem}
              showSelectItem={this.props.showSelectItem}
              setShowCreateItem={this.props.setShowCreateItem}
              setShowSelectItem={this.props.setShowSelectItem}
              create={this.createItem}
              key={index}
              cells={cells}
              category={category}
            />
          ))}
          {this.state.newCategory ? (
            <CategoryRows
              showCreateItem={this.props.showCreateItem}
              showSelectItem={this.props.showSelectItem}
              setShowCreateItem={this.props.setShowCreateItem}
              setShowSelectItem={this.props.setShowSelectItem}
              create={this.createItem}
              cells={cells}
              category={this.state.newCategory}
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
    groupedItems: state.tempates.itemsOfCurrentVendor,
  }
}

function mapDispatchToProps() {}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemsTable)
