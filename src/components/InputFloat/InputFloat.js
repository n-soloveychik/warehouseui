import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const handleChange = (setValue, value, { ready, notReady, min, max }) => {
  if (value === '') {
    setValue('' + min)
    return
  }
  value = parseFloat(value)
  if (!value) return
  if (value > max) {
    value = max
  }
  setValue(value + '')
  value < min ? notReady() : ready(value)
}

const InputFloat = (props) => {
  const [value, setValue] = useState(props.defaultValue || '')
  return (
    <TextField
      label={props.label}
      type='number'
      value={value}
      onChange={(e) => handleChange(setValue, e.target.value, props)}
    />
  )
}

export default InputFloat
