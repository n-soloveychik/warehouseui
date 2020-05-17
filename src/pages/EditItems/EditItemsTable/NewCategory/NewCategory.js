import React, { Component } from 'react'
import { TableRow, TableCell, Button } from '@material-ui/core'
import SelectCategory from './SelectCategory/SelectCategory'
import CreateCategory from './CreateCategory/CreateCategory'
import classes from './NewCategory.module.scss'
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
          {(this.state.selecting && (
            <SelectCategory
              handleOk={this.addCategory}
              categories={categories}
              handleCancel={() => this.setSelecting(false)}
            />
          )) ||
            (this.state.creating && (
              <CreateCategory
                handleOk={this.addNewCategory}
                handleCancel={() => this.setCreating(false)}
              />
            )) || (
              <Buttons
                handleSelect={() => this.setSelecting(true)}
                handleCreate={() => this.setCreating(true)}
              />
            )}
        </TableCell>
      </TableRow>
    )
  }
}

export default NewCategory
