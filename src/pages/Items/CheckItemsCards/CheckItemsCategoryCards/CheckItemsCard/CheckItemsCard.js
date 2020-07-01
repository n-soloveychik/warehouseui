import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import classes from "./CheckItemsCard.module.scss";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { warehouseActions } from "@/redux/actions/actions";
import { itemStatusColors } from "@/configs/itemStatusColors";
import ComingCountCell from "@/components/ComingCountCell/ComingCountCell";
import ShipmentCountCell from "@/components/ShipmentCountCell/ShipmentCountCell";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import HistoryIcon from "@material-ui/icons/History";

const style = {
  card: {
    boxShadow: "0 0 2px 0",
    margin: "30px 16px",
  },
  image: {
    backgroundSize: "contain",
  },
  status: itemStatusColors,
  title: {
    fontSize: "1.2rem",
  },
};

const CheckItemsCard = (props) => {
  const handleImageClick = () => {
    if (props.item.new_count_in_stock === props.item.count) {
      props.setItemNewCountInStock(
        props.item.item_id,
        props.item.count_in_stock
      );
      return;
    }
    props.setItemNewCountInStock(props.item.item_id, props.item.count);
  };
  return (
    <Card style={{ ...style.card, ...style.status[props.item.status_id] }}>
      <CardHeader
        title={props.item.item_num}
        style={{ ...style.title }}
        action={
          <>
            {props.item.count > props.item.count_in_stock && (
              <IconButton
                onClick={(e) => props.openTransfer(props.item.item_id)}
              >
                <TransferWithinAStationIcon />
              </IconButton>
            )}
            <IconButton
              onClick={(e) =>
                props.contextMenuButtonClick(props.item, e.target)
              }
              style={style.report}
            >
              <Badge
                badgeContent={
                  props.item.claims?.filter((claim) => !claim.closed)?.length ||
                  0
                }
                color="error"
              ></Badge>
              <ReportProblemIcon />
            </IconButton>
          </>
        }
      />
      <CardMedia
        onClick={handleImageClick}
        style={style.image}
        className={classes.image}
        image={props.item.image}
      />
      <CardActions style={{ flexDirection: "column" }}>
        {!!props.item.has_transfer && (
          <IconButton
            onClick={() => props.openHistoryTransfer(props.item.item_id)}
            style={{ position: "relative", left: 0, top: 0 }}
          >
            <HistoryIcon />
          </IconButton>
        )}
        <Typography>Поступило</Typography>
        <ComingCountCell item={props.item} />
        <Typography>Отгружено</Typography>
        <ShipmentCountCell item={props.item} />
      </CardActions>
    </Card>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setItemNewCountInStock: (itemId, newCountInStock) =>
      warehouseActions.item.newCountInStock.set(
        dispatch,
        itemId,
        newCountInStock
      ),
    setItemCountInStock: (itemId, countInStock) =>
      warehouseActions.item.countInStock.set(dispatch, itemId, countInStock),
  };
}

export default connect(null, mapDispatchToProps)(CheckItemsCard);
