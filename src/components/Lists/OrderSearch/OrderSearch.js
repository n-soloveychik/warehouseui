import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import { warehouseActions } from "@/redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    left: "50%",
    transform: "translateX(-50%)",
    position: "relative",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const OrderSearch = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        onChange={(e) => props.searchSet(e.target.value)}
        value={props.searchStr}
        className={classes.input}
        placeholder="Поиск заказа"
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searchStr: state.warehouse.orderSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSet: (searchStr) =>
      warehouseActions.orders.setSearch(dispatch, searchStr),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSearch);
