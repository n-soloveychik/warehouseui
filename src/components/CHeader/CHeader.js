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
      <Button style={{ color: 'white' }}>
        <Typography onClick={props.onTextClick} variant='h6'>
          {props.text}
        </Typography>
      </Button>
    </Toolbar>
  </AppBar>
)

export default CHeader
