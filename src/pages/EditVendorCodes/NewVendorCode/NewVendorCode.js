import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import { IconButton } from '@material-ui/core'
import classes from './NewVendorCode.module.scss'
import InputVendorCode from './InputVendorCode/InputVendorCode'

class NewVendorCode extends Component {
  state = {
    showTextField: false,
    sendDisabled: true,
  }

  showTextField = () => {
    this.setState({
      showTextField: true,
    })
  }

  nameSuccess = (value) => {
    this.setState({ sendDisabled: false, newName: value })
  }

  nameFail = (value) => {
    this.setState({ sendDisabled: true, newName: value })
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.showTextField ? (
          <>
            <InputVendorCode
              typeSuccess={this.nameSuccess}
              typeContinue={this.nameFail}
            />
            <IconButton color='primary' disabled={this.state.sendDisabled}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <Button
            onClick={this.showTextField}
            variant='outlined'
            startIcon={<AddIcon />}
          >
            Новая ведомость
          </Button>
        )}
      </div>
    )
  }
}

export default NewVendorCode
