import React, { Component } from "react";
import { connect } from "react-redux";
import CHeader from "@/components/CHeader/CHeader";
import TemplateItemsTable from "./TemplateItemsTable/TemplateItemsTable";
import { templateActions } from "@/redux/actions/actions";
import { menuRoutesConfig } from "@/configs/menuRoutes";
import ChangeCategoryModal from "./ChangeCategoryModal/ChangeCategoryModal";
import { Menu, MenuItem } from "@material-ui/core";

class TemplateItems extends Component {
  componentDidMount = async () => {
    const invoiceId = this.props.match.params.invoice;
    if (!this.props.currentInvoice(invoiceId)) {
      await this.props.getInvoices();
    }
    await this.props.getCategories();
    await this.props.setCurrentInvoice(invoiceId);
    await this.props.getItems(invoiceId);
  };

  state = {
    itemActionsMenuAnchor: null,
    itemActionsMenuOpen: false,
    itemActionsMenuCurrentItem: null,
    changeCategoryModalOpen: false,
    changeCategoryModalCurrentItem: null,
  };

  openItemActionsMenu = (anchor, item) => {
    this.setState({
      itemActionsMenuAnchor: anchor,
      itemActionsMenuOpen: true,
      itemActionsMenuCurrentItem: item,
    });
  };
  closeItemActionsMenu = () => {
    this.setState({
      itemActionsMenuAnchor: null,
      itemActionsMenuOpen: false,
      itemActionsMenuCurrentItem: null,
    });
  };

  openChangeCategoryModal = (item) => {
    this.props.getCategories();
    this.setState({
      changeCategoryModalOpen: true,
      changeCategoryModalCurrentItem: item,
    });
  };
  closeChangeCategoryModal = () => {
    this.setState({
      changeCategoryModalOpen: false,
      changeCategoryModalCurrentItem: null,
    });
  };

  handleSuccessChangingcategory = () => {
    const invoiceId = this.props.match.params.invoice;
    this.props.getItems(invoiceId);
    this.closeChangeCategoryModal();
  };

  handleMenuItemChangeCategoryClick = () => {
    this.openChangeCategoryModal(this.state.itemActionsMenuCurrentItem);
    this.closeItemActionsMenu();
  };

  goBack = () => {
    this.props.history.push("/constructor/invoices");
  };
  menuItems = menuRoutesConfig.filter(
    (route) => route.link !== "/constructor/invoices"
  );

  render() {
    return (
      <div className="page">
        <CHeader
          menuItems={this.menuItems}
          text={
            this.props.currentInvoice(this.props.match.params.invoice)
              ?.invoice_code
          }
          onTextClick={this.goBack}
        />
        <TemplateItemsTable
          openItemActions={this.openItemActionsMenu}
          invoiceId={this.props.match.params.invoice}
        />
        {this.state.changeCategoryModalOpen && (
          <ChangeCategoryModal
            open={this.state.changeCategoryModalOpen}
            item={this.state.changeCategoryModalCurrentItem}
            onClose={this.closeChangeCategoryModal}
            onSuccess={this.handleSuccessChangingcategory}
          />
        )}
        <Menu
          anchorEl={this.state.itemActionsMenuAnchor}
          open={this.state.itemActionsMenuOpen}
          onClose={this.closeItemActionsMenu}
        >
          <MenuItem onClick={this.handleMenuItemChangeCategoryClick}>
            Изменить категорию
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentInvoice: (invoiceId) =>
      state.templates.invoices.find(
        (invoice) => invoice.invoice_id === +invoiceId
      ),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentInvoice: (invoiceId) =>
      templateActions.itemPage.setCurrentInvoice(dispatch, invoiceId),
    getItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    getCategories: () => templateActions.categories.get(dispatch),
    getInvoices: () => templateActions.invoices.get(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateItems);
