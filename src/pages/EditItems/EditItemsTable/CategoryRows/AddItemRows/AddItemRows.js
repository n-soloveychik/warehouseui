import React, { Component } from 'react'
import CreateItem from './CreateItem/CreateItem'
import Buttons from './Buttons/Buttons'
import SelectItem from './SelectItem/SelectItem'

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
  createNewItem = (item) => {
    this.props.create(item)
  }

  render() {
    return (
      <>
        {(this.props.showCreateItem && (
          <CreateItem
            cells={this.props.cells}
            handleCancel={() => this.props.setShowCreateItem(false)}
            handleOk={this.createNewItem}
          />
        )) ||
          (this.props.showSelectItem && (
            <SelectItem
              items={itemsTemplate}
              itemNums={itemsTemplate.map((item) => item.itemNum)}
              cells={this.props.cells}
              handleCancel={() => this.props.setShowSelectItem(false)}
            />
          )) || (
            <Buttons
              showCreating={() => this.props.setShowCreateItem(true)}
              showSelecting={() => this.props.setShowSelectItem(true)}
              cells={this.props.cells}
            />
          )}
      </>
    )
  }
}

export default NewItemRows
