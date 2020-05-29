import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ClickAwayListener } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import { IconButton } from '@material-ui/core'
import classes from './NewInvoice.module.scss'
import InputInvoice from './InputInvoice/InputInvoice'
import { templateActions } from '@/redux/actions/actions'

class NewInvoice extends Component {
  state = {
    sendDisabled: true,
    newName: '',
  }

  static getDerivedStateFromProps(props, state) {
    let newState = state
    if (!props.showAddNewInvoice) {
      newState = {
        sendDisabled: true,
        newName: '',
      }
    }
    return newState
  }

  nameSuccess = (value) => {
    this.setState({ sendDisabled: false, newName: value })
  }

  nameFail = (value) => {
    this.setState({ sendDisabled: true, newName: value })
  }

  setNewInvoiceTemplate = () => {
    this.props.createInvoice({ invoice_code: this.state.newName })
  }

  render() {
    return (
      <div className={classes.container}>
        {this.props.showAddNewInvoice ? (
          <ClickAwayListener onClickAway={this.props.hideAdd}>
            <div>
              <InputInvoice
                typeSuccess={this.nameSuccess}
                typeContinue={this.nameFail}
              />
              <IconButton
                onClick={this.setNewInvoiceTemplate}
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
    showAddNewInvoice: state.templates.invoicePageShowAddInvoice,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    showAdd: () => templateActions?.invoicePage?.showCreateInvoice(dispatch),
    hideAdd: () => templateActions?.invoicePage?.hideCreateInvoice(dispatch),
    createInvoice: (invoice) =>
      templateActions.invoices.create(dispatch, invoice),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice)
