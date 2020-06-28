import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import CHeader from "@/components/CHeader/CHeader";
import {
  SwipeableDrawer,
  Typography,
  List,
  ListItem,
  Badge,
} from "@material-ui/core";
import { claimAction } from "@/redux/actions/actions";
import CardClaim from "@/components/CardClaim/CardClaim";
import classes from "./OrderClaims.module.scss";
import { isMobileOnly } from "react-device-detect";
import { menuRoutesConfig } from "@/configs/menuRoutes";

const style = {
  list: {
    overflow: "auto",
    maxHeight: "90vh",
    padding: "30px 30px 0",
  },
  badge: {
    left: 15,
  },
};

class OrderClaims extends Component {
  state = {
    sidebarOpened: false,
    pageEl: createRef(),
  };

  componentDidMount = async () => {
    await this.props.getClaimsOrders();
  };

  componentDidUpdate = async () => {
    const currentOrder = this.props.match.params.order;
    if (currentOrder && !this.props.currentOrder) {
      this.props.selectCurrentOrder(+currentOrder);
      await this.props.getClaims(currentOrder);
      this.setURLParams();
      return;
    }
    this.setURLParams();
  };

  setURLParams() {
    if (
      // eslint-disable-next-line
      this.props.match.params.order == this.props.currentOrder
    ) {
      return;
    }
    let path = this.props.currentOrder
      ? `/claims/order/${this.props.currentOrder}`
      : "/claims";
    this.props.history.push(path);
  }

  openSidebar = () => {
    this.setState({ sidebarOpened: true });
    this.props.getClaimsOrders();
  };

  closeSidebar = () => {
    this.setState({ sidebarOpened: false });
  };
  menuItems = menuRoutesConfig.filter((route) => route.link !== "/");

  handleListItemClick = (order) => {
    this.props.selectCurrentOrder(+order.order_id);
    this.props.getClaims(order.order_id);
    this.closeSidebar();
    // eslint-disable-next-line
    this.state.pageEl.current.scrollTop = 0;
  };

  render() {
    const currentOrderNum = this.props.orders?.find(
      (order) => order.order_id === this.props.currentOrder
    )?.order_num;
    return (
      <div className="page" ref={this.state.pageEl}>
        <CHeader
          text={currentOrderNum || "Заказы"}
          onTextClick={this.openSidebar}
          menuItems={this.menuItems}
        />
        {Object.keys(this.props.claims).map((key, index) => (
          <div key={`${key}-${index}`}>
            <Typography
              className={`${classes["invoice-title"]} ${
                isMobileOnly ? classes["invoice-title--mobile"] : ""
              }`}
              variant="h5"
            >
              {key}
            </Typography>
            {this.props.claims[key].map((claim, index) => (
              <div className={classes.claim} key={`${claim.claim_id}-${index}`}>
                <CardClaim
                  closeClaim={(claimId) => this.props.closeClaim(claimId)}
                  claim={claim}
                />
              </div>
            ))}
          </div>
        ))}
        <SwipeableDrawer
          onOpen={this.openSidebar}
          onClose={this.closeSidebar}
          open={this.state.sidebarOpened}
        >
          <List style={style.list}>
            {this.props.orders.map((order) => (
              <ListItem
                onClick={() => this.handleListItemClick(order)}
                key={order.order_id}
                className={`${
                  order.order_id === this.props.currentOrder
                    ? classes.currentItem
                    : ""
                } ${classes.item}`}
              >
                {order.order_num}
                <Badge
                  style={style.badge}
                  color="secondary"
                  badgeContent={order.count_claims}
                />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.claim.orders,
    currentOrder: state.claim.currentOrder,
    claims: state.claim.claims,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getClaimsOrders: async () => claimAction.claimsOrders.get(dispatch),
    selectCurrentOrder: (orderId) =>
      claimAction.claimsOrders.selectCurrent(dispatch, +orderId),
    getClaims: async (orderId) => claimAction.claims.get(dispatch, orderId),
    closeClaim: async (claimId) => claimAction.claim.close(dispatch, claimId),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderClaims);
