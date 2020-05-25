import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ClickAwayListener } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import { IconButton } from '@material-ui/core'
import classes from './NewVendorCode.module.scss'
import InputVendorCode from './InputVendorCode/InputVendorCode'
import { templateActions } from '@/redux/actions/actions'

class NewVendorCode extends Component {
  state = {
    sendDisabled: true,
    newName: '',
  }

  static getDerivedStateFromProps(props, state) {
    let newState = state
    if (!props.showAddNewCode) {
      newState = {
        sendDisabled: true,
        newName: '',
      }
    }
    return newState
  }

  hideTextField = () => {
    this.setState({
      showTextField: false,
      sendDisabled: true,
      newName: '',
    })
  }

  nameSuccess = (value) => {
    this.setState({ sendDisabled: false, newName: value })
  }

  nameFail = (value) => {
    this.setState({ sendDisabled: true, newName: value })
  }

  setNewVendorTemplate = () => {
    this.props.createVendor(this.state.newName)
  }

  render() {
    return (
      <div className={classes.container}>
        {this.props.showAddNewCode ? (
          <ClickAwayListener onClickAway={this.props.hideAdd}>
            <div>
              <InputVendorCode
                typeSuccess={this.nameSuccess}
                typeContinue={this.nameFail}
              />
              <IconButton
                onClick={this.setNewVendorTemplate}
                color='primary'
                disabled={this.state.sendDisabled}
              >
                <DoneIcon />
              </IconButton>
            </div>
          </ClickAwayListener>
        ) : (
          <Button
            onClick={this.props.showAdd}
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

function mapStateToProps(state) {
  return {
    showAddNewCode: state.templates.vendorPageShowAddVendor,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    showAdd: () => templateActions.vendorPage.showCreateVendor(dispatch),
    hideAdd: () => templateActions.vendorPage.hideCreateVendor(dispatch),
    createVendor: (vendorCode) =>
      templateActions.vendor.create(dispatch, vendorCode),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVendorCode)
