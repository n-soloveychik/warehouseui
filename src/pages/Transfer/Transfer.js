import React, { Component } from "react";
import { connect } from "react-redux";
import CHeader from "@/components/CHeader/CHeader";
import { transferActions } from "@/redux/actions/actions";
import { Typography } from "@material-ui/core";
import classes from "./Transfer.module.scss";
import AvailableTransfer from "./AvailableTransfer/AvailableTransfer";
import BottomPanel from "./BottomPanel/BottomPanel";

const style = {
  title: {
    margin: 10,
  },
};

class Transfer extends Component {
  componentDidMount = async () => {
    const item_id = this.props.match.params.item;
    this.props.getAvailableTransfer(item_id);
  };

  render() {
    return (
      <div className="page">
        <CHeader />
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
            <BottomPanel />
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentItem, loading, transferAvailable } = state.transfer;
  return {
    currentItem,
    loading,
    transferAvailable,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAvailableTransfer: (item_id) =>
      transferActions.getAvailable(dispatch, item_id),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
