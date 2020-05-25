import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell } from '@material-ui/core'
import SelectCategory from './SelectCategory/SelectCategory'
import CreateCategory from './CreateCategory/CreateCategory'
import Buttons from './Buttons/Buttons'

const categories = [
  { category: 'Шифер', categoryId: 1 },
  { category: 'Болты', categoryId: 2 },
  { category: 'Шурупы', categoryId: 3 },
  { category: 'Гайки', categoryId: 4 },
  { category: 'Металлы', categoryId: 5 },
  { category: 'Пластмассы', categoryId: 6 },
  { category: 'Пластики', categoryId: 7 },
  { category: 'Полимеры', categoryId: 8 },
  { category: 'Карбоны', categoryId: 9 },
]

class NewCategory extends Component {
  state = {
    selecting: false,
    creating: false,
  }

  setSelecting = (bool) => {
    let newState = { selecting: bool }
    if (bool) {
      newState.creating = false
    }
    this.setState(newState)
  }

  setCreating = (bool) => {
    let newState = { creating: bool }
    if (bool) {
      newState.selecting = false
    }
    this.setState(newState)
  }

  addCategory = (category) => {
    this.setSelecting(false)
    this.props.getCategory(category)
  }

  addNewCategory = (categoryName) => {
    this.setCreating(false)
    this.props.getCategory({ category: categoryName, categoryId: null })
  }

  render() {
    return (
      <TableRow>
        <TableCell
          style={{ textAlign: 'center' }}
          colSpan={this.props.cells.length}
        >
          {(this.props.showSelect && (
            <SelectCategory
              handleOk={this.addCategory}
              categories={this.props.categories}
              handleCancel={() => this.setSelecting(false)}
            />
          )) ||
            (this.props.showCreate && (
              <CreateCategory
                categories={this.props.categories}
                handleOk={this.addNewCategory}
                handleCancel={() => this.setCreating(false)}
              />
            )) || <Buttons />}
        </TableCell>
      </TableRow>
    )
  }
}

function mapStateToProps(state) {
  return {
    showCreate: state.templates.itemPageShowCategoryCreate,
    showSelect: state.templates.itemPageShowCategorySelect,
  }
}

export default connect(mapStateToProps)(NewCategory)
