import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import EditItemsTable from './EditItemsTable/EditItemsTable'
import { templateActions } from '@/redux/actions/actions'

// const itemsTemplate = [
//   {
//     itemId: 2,
//     category: 'Фанера',
//     lot: '1',
//     vendorCode: '000-1233',
//     image: '',
//     size: '1',
//     count: 1,
//     itemNum: '1',
//     weight: 1,
//     description: 'DESCRIPTION!',
//   },
//   {
//     itemId: 6,
//     category: 'Фанера',
//     lot: '2',
//     vendorCode: '000-1233',
//     image: '',
//     size: '22',
//     count: 4,
//     itemNum: '2',
//     weight: 87,
//     description: '!!!!!',
//   },
//   {
//     itemId: 2,
//     category: 'Металл',
//     lot: '1',
//     vendorCode: '000-1233',
//     image: '',
//     size: '1',
//     count: 1,
//     itemNum: '1',
//     weight: 1,
//     description: 'DESCRIPTION!',
//   },
//   {
//     itemId: 6,
//     category: 'Металл',
//     lot: '2',
//     vendorCode: '000-1233',
//     image: '',
//     size: '22',
//     count: 4,
//     itemNum: '2',
//     weight: 87,
//     description: '!!!!!',
//   },
//   {
//     itemId: 2,
//     category: 'Карбон',
//     lot: '1',
//     vendorCode: '000-1233',
//     image: '',
//     size: '1',
//     count: 1,
//     itemNum: '1',
//     weight: 1,
//     description: 'DESCRIPTION!',
//   },
//   {
//     itemId: 6,
//     category: 'Карбон',
//     lot: '2',
//     vendorCode: '000-1233',
//     image: '',
//     size: '22',
//     count: 4,
//     itemNum: '2',
//     weight: 87,
//     description: '!!!!!',
//   },
// ]

class EditItems extends Component {
  componentDidMount = async () => {
    const vendorId = this.props.match.params.vendor
    await this.props.getCategories()
    await this.props.setCurrentVendor(vendorId)
    await this.props.getItems(vendorId)
  }

  goBack = () => {
    this.props.history.push('/edit-vendor-codes')
  }

  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack} />
        <EditItemsTable createItem={this.createItem} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentVendor: (vendorId) =>
      templateActions.itemPage.setCurrentVendor(dispatch, vendorId),
    getItems: (vendorId) =>
      templateActions.items.getByVendor(dispatch, vendorId),
    getCategories: () => templateActions.categories.get(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(EditItems)
