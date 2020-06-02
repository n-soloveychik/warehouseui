import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const handleChange = (
  setValue,
  value,
  { ready, notReady, minLength, maxLength },
) => {
  if (value.length > maxLength) {
    value = value.substring(0, maxLength)
  }
  setValue(value)
  value.length < minLength ? notReady() : ready(value)
}

const InputText = (props) => {
  const [value, setValue] = useState(props.defaultValue || '')
  return (
    <TextField
      label={props.label}
      type='text'
      value={value}
      onChange={(e) => handleChange(setValue, e.target.value, props)}
    />
  )
}

export default InputText
