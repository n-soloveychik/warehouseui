import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { templateActions } from '@/redux/actions/actions'
import { categoryOptionsGetter } from '@/redux/getters/categoryGetters'

class SelectCategory extends Component {
  state = {
    value: '',
    opened: true,
  }

  close = () => {
    this.setState({
      opened: false,
    })
  }
  open = () => {
    this.setState({
      opened: true,
    })
  }

  render() {
    return (
      <>
        <Autocomplete
          style={{ width: 300, display: 'inline-flex' }}
          options={this.props.options}
          getOptionLabel={(option) => option.category_name}
          onChange={(event, newValue) => this.setState({ value: newValue })}
          open={this.state.opened}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Начните вводить'
              label='Категория'
              variant='outlined'
              autoFocus={true}
              onBlur={this.close}
              onFocus={this.open}
            />
          )}
        />
        <Button
          disabled={!this.state.value}
          onClick={() => this.props.addCategory(this.state.value)}
        >
          Ок
        </Button>
        <Button onClick={this.props.hideSelect}>Отмена</Button>
      </>
    )
  }
}

function mapStateToProps(state) {
  const categoriesInInvoice = state.templates.itemsOfCurrentInvoice.reduce(
    (acc, cur) => {
      if (!acc.find((item) => item.category_id === cur.category_id)) {
        acc.push({ category_id: cur.category_id })
      }
      return acc
    },
    [],
  )
  return {
    options: categoryOptionsGetter(
      state.templates.categories,
      categoriesInInvoice,
    ),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    hideSelect: () => templateActions.itemPage.hideCategorySelect(dispatch),
    addCategory: (category) =>
      templateActions.newCategory.add(dispatch, category),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
