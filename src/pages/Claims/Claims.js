import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import { Container } from '@material-ui/core'
import CardClaim from './CardClaim/CardClaim'
import { REQUEST } from '@/api'
import { warehouseActions } from '@/redux/actions/actions'

class Claims extends Component {
  state = {
    claims: [],
  }

  componentDidMount = async () => {
    await this.setCurrentParams()
  }

  setCurrentParams = async (toSet = false) => {
    const { order, invoice, item } = this.props.match.params
    if (!this.props.invoices?.length || toSet) {
      await this.props.setCurrentParams(order, invoice)
    }
    const claims = this.props.invoices
      .find((inv) => inv.invoice_id === +invoice)
      ?.items?.find((i) => i.item_id === +item)?.claims
    this.setState({ claims })
  }

  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(`/order/${params.order}/invoice/${params.invoice}`)
  }

  closeClaim = async (claimId) => {
    const response = await REQUEST.closeClaim(claimId)
    if (response.status === 200) {
      await this.setCurrentParams(true)
    }
  }
  menuItems = [
    {
      name: 'Конструктор заказов',
      link: '/constructor/orders',
    },
    {
      name: 'Конструктор комплектовочных ведомостей',
      link: '/constructor/invoices',
    },
  ]

  render() {
    return (
      <div className='page'>
        <CHeader
          menuItems={this.menuItems}
          text='Назад'
          onTextClick={this.goBack}
        ></CHeader>
        {!!this.state.claims?.length && (
          <Container maxWidth='sm'>
            {this.state.claims?.map((claim, index) => (
              <CardClaim
                key={index}
                closeClaim={this.closeClaim}
                claim={claim}
              />
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
    setCurrentParams: async (order_num, invoice_id) =>
      await warehouseActions.uriParams.set(dispatch, order_num, invoice_id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims)
