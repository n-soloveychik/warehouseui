import React, { Component } from 'react'
import InputMask from 'react-input-mask'
import { TextField } from '@material-ui/core'

class InputVendorCode extends Component {
  state = {
    defaultMask: '*999.9999.9999',
    mask: '*999.9999.9999',
    lettersCount: 0,
    value: '',
  }

  onChange = (event) => {
    let value = event.target.value.toUpperCase()
    let lettersCount = value.length - value.replace(/^[A-Z]*/, '').length
    let mask = this.state.defaultMask.padStart(
      this.state.defaultMask.length + lettersCount,
      '*',
    )
    if (value && value.indexOf('_') === -1) {
      this.props.typeSuccess(value)
    } else {
      this.props.typeContinue(value)
    }
    this.setState({ value, mask, lettersCount })
  }
  render() {
    return (
      <InputMask
        autoFocus={true}
        mask={this.state.mask}
        onChange={this.onChange}
        onBlur={this.props.onBlur}
        value={this.state.value}
      >
        <TextField inputProps={{ style: { textAlign: 'center' } }} />
      </InputMask>
    )
  }
}

export default InputVendorCode
