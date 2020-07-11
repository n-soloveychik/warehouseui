import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  DialogActions,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { REQUEST } from "@/api";
import { ROUTER, ERROR } from "@/redux/actions/actionNames";

const ChangeCategoryModal = (props) => {
  const [newCategory, setNewCategory] = useState(null);
  const changeCategory = async () => {
    const response = await REQUEST.updateTemplateItemCategory(
      props.item.item_id,
      newCategory
    );

    if (response.status === 401) {
      props.unauthorized();
      return;
    }

    if (response.status === 200) {
      props.onSuccess();
      return;
    }

    props.showError(response.status, response.data?.message);
  };

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs" open={true}>
      <DialogTitle id="confirmation-dialog-title">
        Переместить продукт из категории '{props.item.category}' в
      </DialogTitle>
      {props.categoriesLoading ? (
        <Typography style={{ textAlign: "center", margin: "30px 0" }}>
          Загрузка списка категорий
        </Typography>
      ) : (
        <DialogContent dividers>
          <RadioGroup
            aria-label="ringtone"
            name="ringtone"
            value={newCategory}
            onChange={(event, value) => setNewCategory(+value)}
          >
            {props.categories
              .filter(
                (category) => +category.category_id !== +props.item.category_id
              )
              ?.map((category, index) => (
                <FormControlLabel
                  value={+category.category_id}
                  key={index}
                  control={<Radio color="primary" />}
                  label={category.category_name}
                />
              ))}
          </RadioGroup>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Отмена
        </Button>
        <Button
          disabled={newCategory === null}
          onClick={changeCategory}
          color="primary"
        >
          Выбрать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.templates.categories,
    categoriesLoading: state.templates.categoriesLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unauthorized: () => dispatch({ type: ROUTER.UNAUTHORIZED }),
    showError: (title, text) => dispatch({ type: ERROR.OPEN, title, text }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCategoryModal);
