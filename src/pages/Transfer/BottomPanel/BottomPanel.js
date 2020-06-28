import React from "react";
import { connect } from "react-redux";
import classes from "./BottomPanel.module.scss";
import { Typography, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { TRANSFER } from "@/redux/actions/actionNames";

const BottomPanel = (props) => {
  return (
    <div className={classes.panel}>
      <div className={classes["panel-payload"]}>
        <Typography>{`Добавлено: ${props.count_transfer} / ${props.count_lack}`}</Typography>
        <div className="buttons">
          <IconButton onClick={props.reset}>
            <ClearIcon />
          </IconButton>
          <IconButton>
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    count_lack: state.transfer.currentItem.count_lack,
    count_transfer: state.transfer.currentItem.count_transfer,
    disableReset: state.transfer.transferAvailable.reduce(
      (is, order) =>
        is &&
        order.invoices.reduce(
          (iIs, invoice) => iIs && invoice.count_transfer === 0,
          true
        ),
      true
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch({ type: TRANSFER.RESET }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
