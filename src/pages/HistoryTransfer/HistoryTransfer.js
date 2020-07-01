import React, { Component } from "react";
import { connect } from "react-redux";
import CHeader from "@/components/CHeader/CHeader";
import { transferActions } from "@/redux/actions/actions";
import { menuRoutesConfig } from "@/configs/menuRoutes";
import { Typography } from "@material-ui/core";
import classes from "./HistoryTransfer.module.scss";
import HistoryTransferItem from "./HistoryTransferItem/HistoryTransferItem";

class HistoryTransfer extends Component {
  componentDidMount = () => {
    const itemId = this.props.match.params.item;
    this.props.getHistory(itemId);
  };

  goBack = () => {
    const { order, invoice } = this.props.match.params;
    this.props.history.push(`/order/${order}/invoice/${invoice}`);
  };

  menuItems = menuRoutesConfig.filter((route) => route.link !== "/");

  render() {
    const { item_num, order_num, invoice_code } = this.props.currentItem || {};
    return (
      <div className="page">
        <CHeader
          menuItems={this.menuItems}
          text="Назад"
          onTextClick={this.goBack}
        />
        {this.props.historyLoading ? (
          <Typography variant="h5" className={classes.loading}>
            Загрузка истории трансферов товаров
          </Typography>
        ) : this.props.historyTransfer?.length ? (
          <>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                margin: "16px 0",
              }}
            >
              История трансферов{" "}
              <span style={{ backgroundColor: "#3f51b54d" }}>
                {`${!!order_num && order_num + " /"} ${
                  !!invoice_code && invoice_code + " /"
                } ${!!item_num && item_num}`}
              </span>
            </Typography>
            {this.props.historyTransfer.map((item, index) => (
              <HistoryTransferItem
                current={
                  order_num === item.from_order_num &&
                  invoice_code === item.from_invoice_code
                    ? "from"
                    : "to"
                }
                key={index}
                item={item}
              />
            ))}
          </>
        ) : (
          <Typography
            variant="h5"
            style={{
              position: "relative",
              top: "50%",
              left: "50%",
              textAlign: "center",
              transform: "translate(-50%, -50%)",
            }}
          >
            История пуста
          </Typography>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentItem: state.transfer.currentItem,
    historyTransfer: state.transfer.historyTransfer,
    historyLoading: state.transfer.historyLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHistory: async (itemId) =>
      await transferActions.getItemTransferHistory(dispatch, itemId),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransfer);
