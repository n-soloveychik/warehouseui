import React from "react";
import { connect } from "react-redux";
import classes from "./BottomPanel.module.scss";
import { Typography, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { TRANSFER } from "@/redux/actions/actionNames";
import { transferActions } from "@/redux/actions/actions";

const BottomPanel = (props) => {
  const supplement = (item_id, transferAvailable) => {
    if (props.supplement(item_id, transferAvailable)) {
      props.goBack();
    }
  };
  return (
    <div className={classes.panel}>
      <div className={classes["panel-payload"]}>
        <Typography>{`Добавлено: ${props.count_transfer} / ${props.count_lack}`}</Typography>
        <div className="buttons">
          <IconButton disabled={props.disableReset} onClick={props.reset}>
            <ClearIcon />
          </IconButton>
          <IconButton
            onClick={() => supplement(props.item_id, props.transferAvailable)}
            disabled={props.count_transfer === 0}
          >
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { count_lack, count_transfer, item_id } = state.transfer.currentItem;
  return {
    count_lack,
    count_transfer,
    item_id,
    transferAvailable: state.transfer.transferAvailable,
    disableReset: state.transfer.transferAvailable.reduce(
      (is, order) =>
        is &&
        order.invoices.reduce(
          (iIs, invoice) =>
            iIs && (!invoice.count_transfer || invoice.count_transfer === 0),
          true
        ),
      true
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch({ type: TRANSFER.RESET }),
    supplement: (item_id, transferAvailable) =>
      transferActions.supplement(dispatch, item_id, transferAvailable),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
