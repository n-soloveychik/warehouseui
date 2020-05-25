import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { templateActions } from '@/redux/actions/actions'

class CreateCategory extends Component {
  state = {
    value: '',
  }
  render() {
    return (
      <>
        <TextField
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <Button
          disabled={!this.state.value}
          onClick={() =>
            this.props.addCategory({
              category: this.state.value,
              categoryId: null,
            })
          }
        >
          Ок
        </Button>
        <Button onClick={this.props.hideCreate}>Отмена</Button>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideCreate: () => templateActions.itemPage.hideCategoryCreate(dispatch),
    addCategory: (category) =>
      templateActions.newCategory.add(dispatch, category),
  }
}

export default connect(null, mapDispatchToProps)(CreateCategory)
