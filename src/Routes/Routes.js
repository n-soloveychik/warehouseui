import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Items from "@/pages/Items/Items";
import CreateClaim from "@/pages/CreateClaim/CreateClaim";
import ItemClaims from "@/pages/ItemClaims/ItemClaims";
import OrderClaims from "@/pages/OrderClaims/OrderClaims";
import TemplateInvoices from "@/pages/TemplateInvoices/TemplateInvoices";
import TemplateItems from "@/pages/TemplateItems/TemplateItems";
import Login from "@/pages/Login/Login";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import MakeOrder from "@/pages/MakeOrder/MakeOrder";
import Transfer from "@/pages/Transfer/Transfer";

const Routes = ({ authorized }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Items} />
      <PrivateRoute exact path="/order/" component={Items} />
      <PrivateRoute exact path="/order/:order/" component={Items} />
      <PrivateRoute exact path="/claims" component={OrderClaims} />
      <PrivateRoute exact path="/claims/order" component={OrderClaims} />
      <PrivateRoute exact path="/claims/order/:order" component={OrderClaims} />
      <PrivateRoute
        exact
        path="/order/:order/invoice/:invoice"
        component={Items}
      />
      <PrivateRoute
        exact
        path="/order/:order/invoice/:invoice/item/:item/transfer"
        component={Transfer}
      />
      <PrivateRoute
        exact
        path="/order/:order/invoice/:invoice/item/:item/claims"
        component={ItemClaims}
      />
      <PrivateRoute
        exact
        path="/order/:order/invoice/:invoice/item/:item/new-claim"
        component={CreateClaim}
      />
      <PrivateRoute
        exact
        path="/constructor/invoices"
        component={TemplateInvoices}
      />
      <PrivateRoute
        exact
        path="/constructor/invoices/:invoice/items"
        component={TemplateItems}
      />
      <PrivateRoute exact path="/constructor/orders" component={MakeOrder} />
      <PrivateRoute
        exact
        path="/constructor/orders/:order"
        component={MakeOrder}
      />
      <Route
        exact
        path="/login"
        render={() => (authorized ? <Redirect to="/" /> : <Login />)}
      />
      <PrivateRoute component={Items} />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    authorized: state.router.authorized,
  };
}

export default connect(mapStateToProps)(Routes);
