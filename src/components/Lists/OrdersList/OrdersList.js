import React from "react";
import { List, ListItem, Typography, Badge } from "@material-ui/core";
import classes from "./OrdersList.module.scss";
import { isMobileOnly } from "react-device-detect";
import orderInvoiceColors from "@/configs/orderInvoiceColors";

const statusColors = {
  ...orderInvoiceColors,
};

const OrdersList = (props) => {
  const style = {
    title: {
      marginBottom: 16,
    },
    item: {
      marginBottom: 10,
    },
    subtitle: {
      textAlign: "center",
      marginBottom: 16,
      fontSize: 15,
    },
  };

  const makeList = (item, index) => {
    const className = [classes.item];
    if (
      props.currentItem &&
      props.currentItem === item[props.keyDetectCurrent]
    ) {
      className.push(classes["item--current"]);
    }
    if (isMobileOnly) {
      className.push(classes["item--mobile"]);
    }
    return (
      <ListItem
        onClick={() => props.handleItemClick(item)}
        className={className.join(" ")}
        key={index}
        style={{ ...statusColors[item.status_id], paddingRight: 30 }}
      >
        {item[props.keyToRender]}
        {item.count > 1 && (
          <Badge
            color="primary"
            style={{ right: 16, position: "absolute" }}
            badgeContent={item.count}
          />
        )}
      </ListItem>
    );
  };

  const shipmentItems = props.items
    .filter((item) => item.has_shipment)
    .map(makeList);

  const unshipmentItems = props.items
    .filter((item) => !item.has_shipment)
    .map(makeList);

  return (
    <>
      <Typography
        variant={isMobileOnly ? "subtitle1" : "h5"}
        style={style.title}
      >
        {"Заказы"}
      </Typography>
      <List className={classes.paper}>{unshipmentItems}</List>

      <Typography
        variant={isMobileOnly ? "subtitle1" : "h6"}
        style={style.subtitle}
      >
        {"Отгружено / Частично отгружено"}
      </Typography>
      <List className={classes.paper}>{shipmentItems}</List>
    </>
  );
};

export default OrdersList;
