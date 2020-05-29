import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, TableBody } from '@material-ui/core'
import HeadRow from './HeadRow/HeadRow'
import CategoryRows from './CategoryRows/CategoryRows'
import NewCategory from './NewCategory/NewCategory'
import { editItemsGetter } from '@/redux/getters/itemsGetters'

class TemplateItemsTable extends Component {
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
        <HeadRow />
        <TableBody>
          {this.props.groupedItems.map((category, index) => (
            <CategoryRows
              create={this.createItem}
              key={index}
              category={category}
            />
          ))}
          {!!this.props.newCategory?.category ? (
            <CategoryRows
              create={this.createItem}
              category={this.props.newCategory}
            />
          ) : (
            <NewCategory
              categories={this.props.categories}
              getCategory={this.setNewCategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateItemsTable)
