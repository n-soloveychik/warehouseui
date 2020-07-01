import React from "react";
import { Typography } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import classes from "./HistoryTransferItem.module.scss";

const style = {
  text:
    window.innerWidth <= 780
      ? {
          margin: "0 16px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }
      : {},
};

const HistoryTransferItem = ({ item }) => {
  return (
    <div className={classes.item}>
      <Typography style={style.text} className={classes.text}>
        <span className={classes.textPart}>{`${item.from_order_num} / `}</span>
        <span
          className={classes.textPart}
        >{` ${item.from_invoice_code} / `}</span>
        <span className={classes.textPart}>{` ${item.from_item_id}`}</span>
      </Typography>
      <div className={classes.countBlock}>
        <ArrowRightAltIcon fontSize="large" className={classes.arrow} />
        <Typography className={classes.count}>{item.count}</Typography>
      </div>
      <Typography style={style.text} className={classes.text}>
        <span className={classes.textPart}>{`${item.to_order_num} / `}</span>
        <span
          className={classes.textPart}
        >{` ${item.to_invoice_code} / `}</span>
        <span className={classes.textPart}>{` ${item.to_item_id}`}</span>
      </Typography>
    </div>
  );
};

export default HistoryTransferItem;
