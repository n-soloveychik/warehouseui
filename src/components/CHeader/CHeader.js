import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const CHeader = (props) => (
  <AppBar position='static'>
    <Toolbar>
      <IconButton
        style={{ marginRight: 20 }}
        edge='start'
        color='inherit'
        aria-label='menu'
      >
        <MenuIcon />
      </IconButton>
      <Button style={{ color: 'white' }}>
        <Typography onClick={props.onTextClick} variant='h6'>
          {props.text}
        </Typography>
      </Button>
    </Toolbar>
  </AppBar>
)

export default CHeader
