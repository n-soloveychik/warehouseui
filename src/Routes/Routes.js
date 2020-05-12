import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Items from '@/pages/Items/Items'
import CreateClaim from '@/pages/CreateClaim/CreateClaim'

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
      <Route component={Items} />
    </Switch>
  )
}
