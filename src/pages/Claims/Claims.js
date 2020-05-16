import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import { Container } from '@material-ui/core'
import CardClaim from './CardClaim/CardClaim'
import { getItemsByVendorCode } from '@/redux/actions/actions'

class Claims extends Component {
  constructor(props) {
    super(props)
    const claims = this.props.items.find(
      (item) => item.itemId === this.props.match.params.item,
    )?.itemclaimsList
    if (!claims) {
      this.props.getItemsByVendorCode(this.props.match.params.vendor)
    }
    this.state = { claims }
  }

  static getDerivedStateFromProps(props, state) {
    const claims = props.items.find(
      (item) => item.itemId === +props.match.params.item,
    )?.itemclaimsList
    if (!state.claims && claims) {
      state = { claims }
    }
    return state
  }

  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(
      `/order/${params.order}/vendor-code/${params.vendor}`,
    )
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
    items: state.warehouse.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getItemsByVendorCode: (vendorCode) => {
      getItemsByVendorCode(dispatch, vendorCode)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims)
