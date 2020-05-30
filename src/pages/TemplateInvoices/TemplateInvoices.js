import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Container, TextField } from '@material-ui/core'
import InvoiceList from './InvoiceList/InvoiceList'
import NewInvoice from './NewInvoice/NewInvoice'
import { templateActions } from '@/redux/actions/actions'

class TemplateInvoices extends Component {
  state = {
    search: '',
  }

  openInvoiceTemplateItems = (invoice) => {
    this.props.history.push(`${this.props.location.pathname}/${invoice}/items`)
  }

  componentDidMount = async () => {
    this.props.getInvoices()
  }

  render() {
    return (
      <>
        <Typography style={{ textAlign: 'center' }} variant='h4'>
          Комплектовочные ведомости
        </Typography>
        <Container
          maxWidth='sm'
          style={{ height: 'calc(100vh - 41px)', overflow: 'hidden' }}
        >
          <NewInvoice />
          <TextField
            style={{ left: '50%', transform: 'translateX(-50%)' }}
            label='Поиск'
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
          />
          <InvoiceList
            search={this.state.search}
            invoiceTemplates={this.props.invoices}
            openItems={this.openInvoiceTemplateItems}
          ></InvoiceList>
        </Container>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    invoices: state.templates?.invoices,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInvoices: () => templateActions.invoices.get(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateInvoices)
