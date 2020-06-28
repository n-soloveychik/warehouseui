import React, { Component } from "react";
import { connect } from "react-redux";
import CHeader from "@/components/CHeader/CHeader";
import { transferActions } from "@/redux/actions/actions";
import { Typography, CircularProgress } from "@material-ui/core";
import classes from "./Transfer.module.scss";
import AvailableTransfer from "./AvailableTransfer/AvailableTransfer";
import BottomPanel from "./BottomPanel/BottomPanel";
import { menuRoutesConfig } from "@/configs/menuRoutes";

const style = {
  title: {
    margin: 10,
  },
};

class Transfer extends Component {
  componentDidMount = async () => {
    const item_id = this.props.match.params.item;
    await this.props.getAvailableTransfer(item_id);
    if (!this.props.count_lack) this.goBack();
  };

  goBack = () => {
    const { order, invoice } = this.props.match.params;
    this.props.history.push(`/order/${order}/invoice/${invoice}`);
  };

  menuItems = menuRoutesConfig.filter((route) => route.link !== "/");

  render() {
    return (
      <div className="page">
        <CHeader
          menuItems={this.menuItems}
          text="Назад"
          onTextClick={this.goBack}
        />
        {this.props.loading && (
          <Typography className={classes.loading} variant="h5">
            Загрузка данных укомплектовки...
          </Typography>
        )}
        {!this.props.loading && this.props.transferAvailable.length && (
          <>
            <Typography
              className={classes.title}
              style={style.title}
              variant="h5"
            >
              {`Доукомплектовка продукта: ${this.props.currentItem?.order_num} / ${this.props.currentItem?.invoice_code} / ${this.props.currentItem?.item_num}`}
            </Typography>
            <AvailableTransfer />
            <BottomPanel goBack={this.goBack} />
          </>
        )}
        {this.props.supplementLoading && (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255,255,255,0.5",
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    currentItem,
    loading,
    transferAvailable,
    supplementLoading,
  } = state.transfer;
  return {
    currentItem,
    loading,
    transferAvailable,
    supplementLoading,
    count_lack: state.transfer.currentItem?.count_lack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAvailableTransfer: (item_id) =>
      transferActions.getAvailable(dispatch, item_id),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
