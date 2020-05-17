import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateItem from './CreateItem/CreateItem'
import Buttons from './Buttons/Buttons'
import SelectItem from './SelectItem/SelectItem'
import { templateActions } from '@/redux/actions/actions'

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

  createNewItem = (item) => {}

  render() {
    return (
      <>
        {(this.state.showCreate && (
          <CreateItem
            cells={this.props.cells}
            handleCancel={() => this.setState({ showCreate: false })}
            handleOk={this.createNewItem}
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

function mapDispatchToProps(dispatch) {
  return {
    createCategory: (categoryName) =>
      templateActions.categories.create(dispatch, categoryName),
  }
}

export default connect(null, mapDispatchToProps)(NewItemRows)
