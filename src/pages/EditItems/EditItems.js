import React, { Component } from 'react'
import CHeader from '@/components/CHeader/CHeader'
import EditItemsTable from './EditItemsTable/EditItemsTable'
import { editItemsGetter } from '@/redux/getters/itemsGetters'

const itemsTemplate = [
  {
    itemId: 2,
    category: 'Фанера',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '1',
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
    itemNum: '2',
    weight: 87,
    description: '!!!!!',
  },
  {
    itemId: 2,
    category: 'Металл',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '1',
    weight: 1,
    description: 'DESCRIPTION!',
  },
  {
    itemId: 6,
    category: 'Металл',
    lot: '2',
    vendorCode: '000-1233',
    image: '',
    size: '22',
    count: 4,
    itemNum: '2',
    weight: 87,
    description: '!!!!!',
  },
  {
    itemId: 2,
    category: 'Карбон',
    lot: '1',
    vendorCode: '000-1233',
    image: '',
    size: '1',
    count: 1,
    itemNum: '1',
    weight: 1,
    description: 'DESCRIPTION!',
  },
  {
    itemId: 6,
    category: 'Карбон',
    lot: '2',
    vendorCode: '000-1233',
    image: '',
    size: '22',
    count: 4,
    itemNum: '2',
    weight: 87,
    description: '!!!!!',
  },
]

class EditItems extends Component {
  goBack = () => {
    this.props.history.push('/edit-vendor-codes')
  }

  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack} />
        <EditItemsTable groupedItems={editItemsGetter(itemsTemplate)} />
      </div>
    )
  }
}

export default EditItems
