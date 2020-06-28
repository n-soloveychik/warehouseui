import React from "react";
import { connect } from "react-redux";
import { checkItemsGetter } from "@/redux/getters/itemsGetters";
import CheckItemsCategoryCards from "./CheckItemsCategoryCards/CheckItemsCategoryCards";
import classes from "./CheckItemsCards.module.scss";

const CheckItemsCard = (props) => {
  return (
    <div className={classes.cards}>
      {props.categories.map((category) => (
        <CheckItemsCategoryCards
          openTransfer={props.openTransfer}
          contextMenuButtonClick={props.contextMenuButtonClick}
          key={category.category}
          category={category}
        />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    categories: checkItemsGetter(state),
  };
}

export default connect(mapStateToProps)(CheckItemsCard);
