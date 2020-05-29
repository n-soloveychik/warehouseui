import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Items from '@/pages/Items/Items'
import CreateClaim from '@/pages/CreateClaim/CreateClaim'
import Claims from '@/pages/Claims/Claims'
import TemplateInvoices from '@/pages/TemplateInvoices/TemplateInvoices'
import TemplateItems from '@/pages/TemplateItems/TemplateItems'
import Login from '@/pages/Login/Login'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import MakeOrder from '@/pages/MakeOrder/MakeOrder'

const Routes = ({ authorized }) => {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Items} />
      <PrivateRoute exact path='/order/:order/' component={Items} />
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
      <PrivateRoute
        exact
        path='/template/invoices'
        component={TemplateInvoices}
      />
      <PrivateRoute
        exact
        path='/template/invoices/:invoice/items'
        component={TemplateItems}
      />
      <PrivateRoute exact path='/order' component={MakeOrder} />
      <Route
        exact
        path='/login'
        render={() => (authorized ? <Redirect to='/' /> : <Login />)}
      />
      <PrivateRoute component={Items} />
    </Switch>
  )
}

function mapStateToProps(state) {
  return {
    authorized: state.router.authorized,
  }
}

export default connect(mapStateToProps)(Routes)
