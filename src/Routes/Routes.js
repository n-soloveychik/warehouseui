import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Items from '@/pages/Items/Items'
import CreateClaim from '@/pages/CreateClaim/CreateClaim'
import Claims from '@/pages/Claims/Claims'
import EditVendorCodes from '@/pages/EditVendorCodes/EditVendorCodes'
import EditItems from '@/pages/EditItems/EditItems'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Items} />
      <Route exact path='/order' component={Items} />
      <Route exact path='/order/:order/' component={Items} />
      <Route exact path='/order/:order/vendor-code' component={Items} />
      <Route exact path='/order/:order/vendor-code/:vendor' component={Items} />
      <Route
        exact
        path='/order/:order/vendor-code/:vendor/item/:item/new-claim'
        component={CreateClaim}
      />
      <Route
        exact
        path='/order/:order/vendor-code/:vendor/item/:item/claims'
        component={Claims}
      />
      <Route exact path='/edit-vendor-codes' component={EditVendorCodes} />
      <Route
        exact
        path='/edit-vendor-codes/:vendor/edit-items'
        component={EditItems}
      />
      <Route component={Items} />
    </Switch>
  )
}
