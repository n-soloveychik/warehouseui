import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { templateActions } from '@/redux/actions/actions'

const Buttons = (props) => {
  return (
    <>
      <Button
        color='primary'
        style={{ marginRight: 30 }}
        variant='contained'
        onClick={props.showSelect}
      >
        Добавить категорию
      </Button>
      <Button color='primary' variant='contained' onClick={props.showCreate}>
        Новая категория
      </Button>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    showCreate: () => templateActions.itemPage.showCategoryCreate(dispatch),
    showSelect: () => templateActions.itemPage.showCategorySelect(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Buttons)
