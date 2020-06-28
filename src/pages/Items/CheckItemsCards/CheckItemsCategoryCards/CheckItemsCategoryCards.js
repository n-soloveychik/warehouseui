import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import CheckItemsCard from "./CheckItemsCard/CheckItemsCard";
import classes from "./CheckItemsCategoryCards.module.scss";
import { connect } from "react-redux";
import { warehouseActions } from "@/redux/actions/actions";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const style = {
  shipmentButton: {
    position: "absolute",
    right: 10,
    top: -8,
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
const CheckItemsCategoryCards = (props) => {
  const items = props.items(props.category.category_id);
  const showButtonCategoryShipment =
    items.every((item) => item.count === item.count_in_stock) &&
    items.some((item) => item.count !== item.count_shipment);

  return (
    <div>
      <div className={classes["category-title"]}>
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
      </div>
      {props.category.lots.map((lot) => (
        <div style={{ zIndex: -1 }} key={lot.name}>
          <Typography
            onClick={() =>
              props.setMultipleFullInStock(
                lot.items.map((item) => item.item_id)
              )
            }
            className={classes["lot-title"]}
          >
            Место: {lot.name}
          </Typography>
          {lot.items.map((item) => (
            <CheckItemsCard
              openTransfer={props.openTransfer}
              contextMenuButtonClick={props.contextMenuButtonClick}
              key={`${item.item_id}-${item.item_num}`}
              item={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
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
    setMultipleFullInStock: (itemIds) =>
      warehouseActions.items.setMultipleFullInStocks(dispatch, itemIds),
    setItemCategoryShipment: ({ invoice_id, category_id }) =>
      warehouseActions.items.category.setShipment(dispatch, {
        invoice_id,
        category_id,
      }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckItemsCategoryCards);
