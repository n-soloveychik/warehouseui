import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'

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
          onClick={() => this.props.handleOk(this.state.value)}
        >
          Ок
        </Button>
        <Button onClick={this.props.handleCancel}>Отмена</Button>
      </>
    )
  }
}

export default CreateCategory
