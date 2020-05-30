import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import TemplateItemsTable from './TemplateItemsTable/TemplateItemsTable'
import { templateActions } from '@/redux/actions/actions'

class TemplateItems extends Component {
  componentDidMount = async () => {
    const invoiceId = this.props.match.params.invoice
    await this.props.getCategories()
    await this.props.setCurrentInvoice(invoiceId)
    await this.props.getItems(invoiceId)
  }

  goBack = () => {
    this.props.history.push('/template/invoices')
  }

  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack} />
        <TemplateItemsTable invoiceId={this.props.match.params.invoice} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentInvoice: (invoiceId) =>
      templateActions.itemPage.setCurrentInvoice(dispatch, invoiceId),
    getItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    getCategories: () => templateActions.categories.get(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(TemplateItems)
