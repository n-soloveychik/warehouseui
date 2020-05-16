import React from 'react'
import { Button } from '@material-ui/core'

const Buttons = (props) => {
  return (
    <>
      <Button
        color='primary'
        style={{ marginRight: 30 }}
        variant='contained'
        onClick={props.handleSelect}
      >
        Добавить категорию
      </Button>
      <Button color='primary' variant='contained' onClick={props.handleCreate}>
        Новая категория
      </Button>
    </>
  )
}

export default Buttons
