import React from "react";
import { TableRow, TableCell, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import AddItemRows from "./CategoryRow/AddItemRows/AddItemRows";
import CategoryRow from "./CategoryRow/CategoryRow";

const CategoryRows = (props) => {
  return (
    <>
      <TableRow>
        <TableCell
          style={{
            textAlign: "center",
            backgroundColor: "rgba(170, 116, 0, 0.363)",
            padding: 0,
          }}
          colSpan={props.cells.length + 1}
        >
          <Typography variant="subtitle1">
            {props.category.category_name}
          </Typography>
        </TableCell>
      </TableRow>
      {props.category.items &&
        props.category.items.map((item, itemIndex) => (
          <CategoryRow
            key={`${item.item_num}-${itemIndex}`}
            openItemActions={props.openItemActions}
            item={item}
            itemIndex={itemIndex}
          />
        ))}
      <AddItemRows
        category={{
          category_id: props.category.category_id,
          category_name: props.category.category_name,
        }}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  };
}

export default connect(mapStateToProps)(CategoryRows);
