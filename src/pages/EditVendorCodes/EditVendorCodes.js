import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Container } from '@material-ui/core'
import VendorList from './VendorList/VendorList'
import NewVendorCode from './NewVendorCode/NewVendorCode'
import { templateActions } from '@/redux/actions/actions'

class EditVendorCodes extends Component {
  openVendorCodeEditItems = (vendorCode) => {
    this.props.history.push(
      `${this.props.location.pathname}/${vendorCode}/edit-items`,
    )
  }

  componentDidMount = async () => {
    this.props.getVendors()
  }

  render() {
    return (
      <>
        <Typography style={{ textAlign: 'center' }} variant='h4'>
          Комплектовочные ведомости
        </Typography>
        <Container
          maxWidth='xs'
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <NewVendorCode />
          <VendorList
            vendorTemplates={this.props.vendors}
            openItems={this.openVendorCodeEditItems}
          ></VendorList>
        </Container>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    vendors: state.templates.vendors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getVendors: () => templateActions.vendor.get(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVendorCodes)
