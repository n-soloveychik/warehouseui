import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateItem from './CreateItem/CreateItem'
import Buttons from './Buttons/Buttons'
import SelectItem from './SelectItem/SelectItem'
import { templateActions } from '@/redux/actions/actions'
import { grpc } from '@/grpc'

const itemsTemplate = [
  {
    itemId: 2,
    category: 'Фанера',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '000.2468.1568',
    weight: 1,
    description: 'DESCRIPTION!',
  },
  {
    itemId: 6,
    category: 'Фанера',
    lot: '2',
    vendorCode: '000-1233',
    image: '',
    size: '22',
    count: 4,
    itemNum: '000.2468.1538',
    weight: 87,
    description: '!!!!!',
  },
  {
    itemId: 2,
    category: 'Фанера',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '000.2468.1468',
    weight: 1,
    description: 'DESCRIPTION!',
  },
  {
    itemId: 6,
    category: 'Фанера',
    lot: '2',
    vendorCode: '000-1233',
    image: '',
    size: '22',
    count: 4,
    itemNum: '000.2468.5568',
    weight: 87,
    description: '!!!!!',
  },
  {
    itemId: 2,
    category: 'Фанера',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '000.2418.1568',
    weight: 1,
    description: 'DESCRIPTION!',
  },
  {
    itemId: 6,
    category: 'Фанера',
    lot: '2',
    vendorCode: '000-1233',
    image: '',
    size: '22',
    count: 4,
    itemNum: '000.2568.1568',
    weight: 87,
    description: '!!!!!',
  },
]

class NewItemRows extends Component {
  state = {
    showCreate: false,
    showSelect: false,
  }

  createItem = async (item) => {
    let categoryId = this.props.category.categoryId
    if (!categoryId) {
      const category = await grpc.template.category.create(
        this.props.category.category,
      )
      categoryId = category.categoryId
    }
    item = {
      ...item,
      categoryId,
    }
    console.log(item)
    const newItem = await grpc.template.item.create(item)
    if (!newItem) return
    const newItemId = newItem.itemId
    await grpc.template.vendor.addItem({
      itemId: newItemId,
      vendorId: this.props.currentVendorId,
    })
    this.setState({
      showCreate: false,
      showSelect: false,
    })
    await this.props.updateCategories()
    this.props.updateItems(this.props.currentVendorId)
  }

  render() {
    return (
      <>
        {(this.state.showCreate && (
          <CreateItem
            cells={this.props.cells}
            handleCancel={() => this.setState({ showCreate: false })}
            handleOk={this.createItem}
          />
        )) ||
          (this.state.showSelect && (
            <SelectItem
              items={itemsTemplate}
              itemNums={itemsTemplate.map((item) => item.itemNum)}
              cells={this.props.cells}
              handleCancel={() => this.setState({ showSelect: false })}
            />
          )) || (
            <Buttons
              showCreating={() => this.setState({ showCreate: true })}
              showSelecting={() => this.setState({ showSelect: true })}
              cells={this.props.cells}
            />
          )}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentVendorId: state.templates.currentVendorId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateItems: (vendorId) =>
      templateActions.items.getByVendor(dispatch, vendorId),
    updateCategories: () => templateActions.categories.get(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemRows)
