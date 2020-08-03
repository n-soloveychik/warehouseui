import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
import { warehouseActions } from "@/redux/actions/actions";

const OrderContextMenu = ({ anchor, opened, onClose, order, deleteOrder }) => {
  const onDelete = () => {
    onClose();
    deleteOrder(order.order_id);
  };

  return (
    <Menu id="lock-menu" anchorEl={anchor} open={opened} onClose={onClose}>
      <MenuItem disabled={true}>{order?.order_num}</MenuItem>
      <MenuItem disabled={false} onClick={onDelete}>
        Удалить
      </MenuItem>
      <MenuItem onClick={() => onClose()}>Отмена</MenuItem>
    </Menu>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    deleteOrder: (order_id) =>
      warehouseActions.order.delete(dispatch, order_id),
  };
}

export default connect(null, mapDispatchToProps)(OrderContextMenu);
