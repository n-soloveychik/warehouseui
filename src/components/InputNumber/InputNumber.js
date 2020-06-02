import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

const handleChange = (setValue, value, { ready, notReady, min, max }) => {
  if (value === '') {
    setValue('' + min)
    return
  }
  value = parseInt(value, 10)
  if (!value) return
  if (value > max) {
    value = max
  }
  setValue(value + '')
  value < min ? notReady() : ready(value)
}

const InputNumber = (props) => {
  const [value, setValue] = useState(props.defaultValue || '')
  return (
    <TextField
      type='number'
      label={props.label}
      value={value}
      onChange={(e) => handleChange(setValue, e.target.value, props)}
    />
  )
}

export default InputNumber
