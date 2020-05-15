import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const CHeader = (props) => (
  <AppBar position='fixed'>
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
