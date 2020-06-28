import React from "react";
import { connect } from "react-redux";
import { Typography, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { TRANSFER } from "@/redux/actions/actionNames";

const AvailableTransfer = (props) => {
  return (
    <div
      style={{
        width: 400,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "calc(100vw - 16px)",
        paddingBottom: 100,
      }}
    >
      {props.transferAvailable?.map((order) => (
        <div key={order.order_id}>
          <Typography>{`Заказ ${order.order_num}`}</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderLeft: "1px solid black",
              paddingLeft: 20,
              margin: "20px 0 20px 20px",
            }}
          >
            {order.invoices.map((invoice) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={invoice.invoice_id}
              >
                <Typography>{invoice.invoice_code}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    disabled={!invoice.count_transfer}
                    onClick={() =>
                      props.transfer(order.order_id, invoice.invoice_id, -1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    style={{ color: invoice.count_transfer ? "black" : "grey" }}
                    onClick={() =>
                      props.transfer(
                        order.order_id,
                        invoice.invoice_id,
                        invoice.count_available
                      )
                    }
                  >{`${invoice.count_transfer || 0} / ${
                    invoice.count_available
                  }`}</Typography>
                  <IconButton
                    disabled={
                      !props.isNeededCount ||
                      !(invoice.count_available - (invoice.count_transfer || 0))
                    }
                    onClick={() =>
                      props.transfer(order.order_id, invoice.invoice_id, 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    transferAvailable: state.transfer.transferAvailable,
    currentItem: state.transfer.currentItem,
    isNeededCount:
      state.transfer.currentItem.count_lack -
      state.transfer.currentItem.count_transfer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transfer: (order_id, invoice_id, count) =>
      dispatch({
        type: TRANSFER.TRANSFER,
        data: { order_id, invoice_id, count },
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableTransfer);
