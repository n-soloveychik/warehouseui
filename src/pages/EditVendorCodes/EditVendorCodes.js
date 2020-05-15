import React, { Component } from 'react'
import { Typography, Container } from '@material-ui/core'
import VendorList from './VendorList/VendorList'
import NewVendorCode from './NewVendorCode/NewVendorCode'

class EditVendorCodes extends Component {
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
          <VendorList></VendorList>
        </Container>
      </>
    )
  }
}

export default EditVendorCodes
