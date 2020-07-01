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

const HistoryTransferItem = ({ item, current }) => {
  return (
    <div className={classes.item}>
      <Typography
        style={{
          ...style.text,
          backgroundColor: current === "from" && "#3f51b54d",
        }}
        className={classes.text}
      >
        <span className={classes.textPart}>{`${item.from_order_num} / `}</span>
        <span className={classes.textPart}>{` ${item.from_invoice_code}`}</span>
      </Typography>
      <div className={classes.countBlock}>
        <ArrowRightAltIcon fontSize="large" className={classes.arrow} />
        <Typography className={classes.count}>{item.count}</Typography>
      </div>
      <Typography
        style={{
          ...style.text,
          backgroundColor: current === "to" && "#3f51b54d",
        }}
        className={classes.text}
      >
        <span className={classes.textPart}>{`${item.to_order_num} / `}</span>
        <span className={classes.textPart}>{` ${item.to_invoice_code}`}</span>
      </Typography>
    </div>
  );
};

export default HistoryTransferItem;
