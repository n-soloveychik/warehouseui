import React from "react";
import { connect } from "react-redux";
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import classes from "./CheckTableCategory.module.scss";
import { warehouseActions } from "@/redux/actions/actions";
import ComingCountCell from "../../../../components/ComingCountCell/ComingCountCell";
import { itemStatusColors } from "@/configs/itemStatusColors";
import ShipmentCountCell from "@/components/ShipmentCountCell/ShipmentCountCell";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";

const style = {
  statusColor: itemStatusColors,
  shipmentButton: {
    position: "absolute",
    right: 10,
    top: -10,
  },
  categoryCell: {
    padding: 0,
    textAlign: "center",
    position: "sticky",
    top: 35,
    zIndex: 3,
    overflow: "hidden",
  },
};

const CheckTableCategory = (props) => {
  const itemClass = (item) => {
    return item.loading ? classes.loading : "";
  };

  const clickUpdateStatusHandler = (e, item) => {
    e.stopPropagation();
    if (item.new_count_in_stock === item.count) {
      props.setItemNewCountInStock(item.item_id, item.count_in_stock);
      return;
    }
    props.setItemNewCountInStock(item.item_id, item.count);
  };

  const clickMultipleUpdateStatusHandler = (e, lot) => {
    const itemIds = lot.items.map((item) => item.item_id);
    e.stopPropagation();
    props.setMultipleFullInStock(itemIds);
  };

  const clickContextMenuHandler = (e, item) => {
    e.stopPropagation();
    props.contextMenuButtonClick(item, e.target);
  };

  const items = props.items(props.category.category_id);
  const showButtonCategoryShipment =
    items.every((item) => item.count === item.count_in_stock) &&
    items.some((item) => item.count !== item.count_shipment);

  const titleRow = (
    <TableRow key={props.category.category}>
      <TableCell
        style={style.categoryCell}
        className={classes["single-cell"]}
        colSpan="9"
      >
        <Typography variant="subtitle1">{props.category.category}</Typography>
        {showButtonCategoryShipment && (
          <IconButton
            style={style.shipmentButton}
            onClick={() =>
              props.setItemCategoryShipment({
                invoice_id: props.invoice_id,
                category_id: props.category.category_id,
              })
            }
          >
            <LocalShippingIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
  const categoryRows = props.category.lots.map((lot, index) =>
    lot.items.map((item, itemIndex) => (
      <TableRow
        className={classes.table_row}
        style={style.statusColor[item.status_id]}
        key={`${props.category.category}-${index}-${itemIndex}`}
      >
        {itemIndex === 0 && (
          <TableCell
            onClick={(e) => clickMultipleUpdateStatusHandler(e, lot)}
            rowSpan={lot.items.length}
            style={{
              textAlign: "center",
              background: "white",
              opacity: 1,
            }}
          >
            {lot.name}
          </TableCell>
        )}
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: "center" }}
        >
          {item.item_num}
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: "center" }}
        >
          <img
            style={{ width: 100, height: 100, objectFit: "contain" }}
            alt="продукт"
            src={item.image}
          />
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: "center" }}
        >
          {item.size}
        </TableCell>
        <TableCell className={itemClass(item)} style={{ textAlign: "center" }}>
          <ComingCountCell item={item} />
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ textAlign: "center" }}
        >
          {item.weight}
        </TableCell>
        <TableCell className={itemClass(item)}>
          <ShipmentCountCell item={item} />
        </TableCell>
        <TableCell
          onClick={(e) => clickUpdateStatusHandler(e, item)}
          className={itemClass(item)}
          style={{ padding: "6px 6px", maxWidth: 51 }}
        ></TableCell>
        <TableCell
          className={itemClass(item)}
          style={{ padding: "6px 6px", maxWidth: 51 }}
        >
          <IconButton
            onClick={(e) => clickContextMenuHandler(e, item)}
            size={"small"}
          >
            <Badge
              badgeContent={
                item.claims?.filter((claim) => !claim.closed)?.length || 0
              }
              color="error"
            >
              <ReportProblemIcon />
            </Badge>
          </IconButton>
          {item.count > item.count_in_stock && (
            <IconButton onClick={() => props.openTransfer(item.item_id)}>
              <TransferWithinAStationIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    ))
  );
  const res = [titleRow, categoryRows].flat(Infinity);
  return res;
};

function mapStateToProps(state) {
  state = state.warehouse;
  return {
    invoice_id: state.currentInvoice,
    items: (category_id) =>
      state.invoices
        .find((invoice) => invoice.invoice_id === state.currentInvoice)
        ?.items?.filter((item) => item.category_id === category_id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setItemNewCountInStock: (itemId, newCountInStock) =>
      warehouseActions.item.newCountInStock.set(
        dispatch,
        itemId,
        newCountInStock
      ),
    setMultipleFullInStock: (itemIds) =>
      warehouseActions.items.setMultipleFullInStocks(dispatch, itemIds),
    setItemCategoryShipment: ({ invoice_id, category_id }) =>
      warehouseActions.items.category.setShipment(dispatch, {
        invoice_id,
        category_id,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckTableCategory);
