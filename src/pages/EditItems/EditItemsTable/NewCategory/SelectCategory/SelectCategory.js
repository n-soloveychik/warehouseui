import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

class SelectCategory extends Component {
  state = {
    value: '',
  }

  render() {
    return (
      <>
        <Autocomplete
          style={{ width: 300, display: 'inline-flex' }}
          options={this.props.categories}
          getOptionLabel={(option) => option.category}
          onChange={(event, newValue) => this.setState({ value: newValue })}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Начните вводить'
              label='Категория'
              variant='outlined'
            />
          )}
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

export default SelectCategory
