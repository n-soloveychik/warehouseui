import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateItem from './CreateItem/CreateItem'
import Buttons from './Buttons/Buttons'
import SelectItem from './SelectItem/SelectItem'
import { templateActions } from '@/redux/actions/actions'
import { REQUEST } from '@/api'

class AddItemRows extends Component {
  state = {
    showCreate: false,
    showSelect: false,
  }

  createItem = async (item) => {
    let category_id = this.props.category.category_id
    item = item.category_id
      ? item
      : {
          ...item,
          category_id,
        }
    let newItem
    if (item.item_id) {
      newItem = item
    } else {
      let response = await REQUEST.createTemplateItem(item)
      newItem = response.data
    }
    if (!newItem) return
    const newItemId = newItem.item_id
    await REQUEST.addTemplateItemToInvoice(
      this.props.currentInvoiceId,
      newItemId,
      item,
    )
    this.setState({
      showCreate: false,
      showSelect: false,
    })
    await this.props.updateCategories()
    this.props.updateItems(this.props.currentInvoiceId)
  }

  render() {
    return (
      <>
        {(this.state.showCreate && (
          <CreateItem
            handleCancel={() => this.setState({ showCreate: false })}
            handleOk={this.createItem}
          />
        )) ||
          (this.state.showSelect && (
            <SelectItem
              category_id={this.props.category.category_id}
              handleOk={this.createItem}
              handleCancel={() => this.setState({ showSelect: false })}
            />
          )) || (
            <Buttons
              showCreating={() => this.setState({ showCreate: true })}
              showSelecting={() => this.setState({ showSelect: true })}
            />
          )}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentInvoiceId: state.templates.currentInvoiceId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (invoiceId) =>
      templateActions.items.getByInvoice(dispatch, invoiceId),
    updateCategories: () => templateActions.categories.get(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemRows)
