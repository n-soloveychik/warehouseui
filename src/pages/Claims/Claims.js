import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import { Container } from '@material-ui/core'
import CardClaim from './CardClaim/CardClaim'
import { setCurrentOrderInvoiceAction } from '@/redux/actions/apiActions/appAction'

class Claims extends Component {
  state = {
    claims: [],
  }

  componentDidMount = async () => {
    const { order, invoice, item } = this.props.match.params
    if (!this.props.invoices?.length) {
      await this.props.setCurrentParams(order, invoice)
    }
    const claims = this.props.invoices
      .find((inv) => inv.invoice_code === invoice)
      ?.items?.find((i) => i.item_id === +item)?.claims
    this.setState({ claims })
  }

  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(`/order/${params.order}/invoice/${params.invoice}`)
  }

  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack}></CHeader>
        {!!this.state.claims?.length && (
          <Container maxWidth='sm'>
            {this.state.claims?.map((claim, index) => (
              <CardClaim key={index} claim={claim} />
            ))}
          </Container>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    invoices: state.warehouse.invoices,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentParams: async (order_num, invoice_code) =>
      await setCurrentOrderInvoiceAction(dispatch, order_num, invoice_code),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims)
