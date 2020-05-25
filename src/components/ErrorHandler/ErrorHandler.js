import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core'
import { errorActions } from '@/redux/actions/actions'

class ErrorHandler extends Component {
  render() {
    return (
      <Dialog open={this.props.opened}>
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <Typography>{this.props.text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red' }} onClick={this.props.close}>
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    opened: state.error.opened,
    title: state.error.title,
    text: state.error.text,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => errorActions.hideError(dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)
