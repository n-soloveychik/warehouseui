import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, TableBody } from "@material-ui/core";
import HeadRow from "./HeadRow/HeadRow";
import CategoryRows from "./CategoryRows/CategoryRows";
import NewCategory from "./NewCategory/NewCategory";
import { templateItemsGetter } from "@/redux/getters/itemsGetters";

class TemplateItemsTable extends Component {
  state = {
    newCategory: null,
  };

  componentDidUpdate = () => {
    if (
      this.state.newCategory &&
      this.props.groupedItems.find(
        (category) => category.categoryId === this.state.newCategory.categoryId
      )
    ) {
      this.setState({ newCategory: null });
    }
  };

  setNewCategory = (newCategory) => {
    this.setState({ newCategory: { ...newCategory, items: [] } });
  };

  render() {
    return (
      <Table size="small">
        <HeadRow />
        <TableBody>
          {this.props.groupedItems.map((category, index) => (
            <CategoryRows
              invoiceId={this.props.invoiceId}
              key={index}
              category={category}
              openItemActions={this.props.openItemActions}
            />
          ))}
          {!!this.props.newCategory.category_name ? (
            <CategoryRows
              invoiceId={this.props.invoiceId}
              category={this.props.newCategory}
            />
          ) : (
            <NewCategory
              categories={this.props.categories}
              getCategory={this.setNewCategory}
            />
          )}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupedItems: templateItemsGetter(
      state.templates.itemsOfCurrentInvoice,
      state.templates.categories
    ),
    newCategory: state.templates.newCategory,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateItemsTable);
