import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const InputInvoice = (props) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    let value = event.target.value.toUpperCase().trim()
    if (value.length > 2 && value.length < 100) {
      props.typeSuccess(value)
    } else {
      props.typeContinue(value)
    }
    setValue(value)
  }
  return (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={props.onBlur}
      autoFocus={true}
      inputProps={{ style: { textAlign: 'center' } }}
    />
  )
}

export default InputInvoice
