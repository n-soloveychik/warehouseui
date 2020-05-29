import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Items from '@/pages/Items/Items'
import CreateClaim from '@/pages/CreateClaim/CreateClaim'
import Claims from '@/pages/Claims/Claims'
// import EditVendorCodes from '@/pages/EditVendorCodes/EditVendorCodes'
// import EditItems from '@/pages/EditItems/EditItems'
import Login from '@/pages/Login/Login'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const Routes = ({ authorized }) => {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Items} />
      <PrivateRoute exact path='/order' component={Items} />
      <PrivateRoute exact path='/order/:order/' component={Items} />
      <PrivateRoute exact path='/order/:order/invoice' component={Items} />
      <PrivateRoute
        exact
        path='/order/:order/invoice/:invoice'
        component={Items}
      />
      <PrivateRoute
        exact
        path='/order/:order/invoice/:invoice/item/:item/claims'
        component={Claims}
      />
      <PrivateRoute
        exact
        path='/order/:order/invoice/:invoice/item/:item/new-claim'
        component={CreateClaim}
      />
      {/* <PrivateRoute exact path='/edit-vendor-codes' component={EditVendorCodes} />
      <PrivateRoute
        exact
        path='/edit-vendor-codes/:vendor/edit-items'
        component={EditItems}
      /> */}
      <Route
        exact
        path='/login'
        render={() => (authorized ? <Redirect to='/' /> : <Login />)}
      />
      {/* <PrivateRoute component={Items} /> */}
    </Switch>
  )
}

function mapStateToProps(state) {
  return {
    authorized: state.router.authorized,
  }
}

export default connect(mapStateToProps)(Routes)
