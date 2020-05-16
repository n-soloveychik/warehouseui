import React, { Component } from 'react'
import { Typography, Container } from '@material-ui/core'
import VendorList from './VendorList/VendorList'
import NewVendorCode from './NewVendorCode/NewVendorCode'

class EditVendorCodes extends Component {
  openVendorCodeEditItems = (vendorCode) => {
    this.props.history.push(
      `${this.props.location.pathname}/${vendorCode}/edit-items`,
    )
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
          <VendorList openItems={this.openVendorCodeEditItems}></VendorList>
        </Container>
      </>
    )
  }
}

export default EditVendorCodes
