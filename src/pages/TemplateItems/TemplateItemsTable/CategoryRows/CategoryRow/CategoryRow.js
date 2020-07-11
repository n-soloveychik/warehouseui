import React from "react";
import { connect } from "react-redux";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import SendImage from "./SendImage/SendImage";
import EditShow from "./EditShow/EditShow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { REQUEST } from "@/api";
import { templateActions, errorActions } from "@/redux/actions/actions";

const removeItem = async (invoiceId, itemId, updateItems, showError) => {
  let response = await REQUEST.removeTemplateItemFromInvoice(invoiceId, itemId);
  if (response.status < 200 && response.status > 299) {
    showError(response.status, response.data.message);
    return;
  }
  updateItems(invoiceId);
};

const CategoryRow = (props) => {
  const { item } = props;
  return (
    <TableRow>
      {props.cells.map((cell, cellIndex) => (
        <TableCell style={cell.style} key={`${item.item_num}-${cellIndex}`}>
          {cell.type === "image" ? (
            <SendImage
              itemId={item.item_id}
              invoiceId={props.invoiceId}
              src={item.image}
              alt={item.item_num}
            />
          ) : (
            <EditShow invoiceId={+props.invoiceId} item={item} cell={cell} />
          )}
        </TableCell>
      ))}
      <TableCell>
        <IconButton
          onClick={(event) => props.openItemActions(event.target, item)}
        >
          <MoreVertIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            removeItem(
              props.invoiceId,
              item.item_id,
              props.updateItems,
              props.showError
            )
          }
        >
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    showError: (title, text) => errorActions.showError(dispatch, title, text),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRow);
