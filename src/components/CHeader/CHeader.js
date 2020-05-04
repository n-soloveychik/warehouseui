import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {}
}

class CHeader extends Component {
  render() {
    return (
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
            <Typography variant='h6'>8863 / 4352.0000.0000</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default connect(mapStateToProps)(CHeader)
