import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import TemplateItemsTable from './TemplateItemsTable/TemplateItemsTable'
import { templateActions } from '@/redux/actions/actions'

class TemplateItems extends Component {
  componentDidMount = async () => {
    const invoiceId = this.props.match.params.invoice
    if (!this.props.currentInvoice(invoiceId)) {
      await this.props.getInvoices()
    }
    await this.props.getCategories()
    await this.props.setCurrentInvoice(invoiceId)
    await this.props.getItems(invoiceId)
  }

  goBack = () => {
    this.props.history.push('/constructor/invoices')
  }

  menuItems = [
    {
      name: 'Заказы',
      link: '/',
    },
    {
      name: 'Конструктор заказов',
      link: '/constructor/orders',
    },
  ]

  render() {
    return (
      <div className='page'>
        <CHeader
          menuItems={this.menuItems}
          text={
            this.props.currentInvoice(this.props.match.params.invoice)
              ?.invoice_code
          }
          onTextClick={this.goBack}
        />
        <TemplateItemsTable invoiceId={this.props.match.params.invoice} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentInvoice: (invoiceId) =>
      state.templates.invoices.find(
        (invoice) => invoice.invoice_id === +invoiceId,
      ),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentInvoice: (invoiceId) =>
      templateActions.itemPage.setCurrentInvoice(dispatch, invoiceId),
    getItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    getCategories: () => templateActions.categories.get(dispatch),
    getInvoices: () => templateActions.invoices.get(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateItems)
