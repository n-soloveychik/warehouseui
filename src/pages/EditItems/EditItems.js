import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import EditItemsTable from './EditItemsTable/EditItemsTable'
import { editItemsGetter } from '@/redux/getters/itemsGetters'
import { grpc } from '@/grpc'
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
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      categories: [],
      showCreateItem: false,
    }
    console.log(this.props.match.params.vendor)
    this.props.setCurrentVendor(this.props.match.params.vendor)
  }

  setShowCreateItem = (showCreateItem) => {
    this.setState({ showCreateItem })
  }

  setShowSelectItem = (showSelectItem) => {
    this.setState({ showSelectItem })
  }

  componentDidMount = async () => {
    await this.callForItems()
    await this.getCategories()
  }

  getCategories = async () => {
    const categories = await grpc.template.category.get()
    this.setState({ categories })
  }

  callForItems = async () => {
    const vendorId = this.props.match.params.vendor
    let items = await grpc.template.item.getByVendor(vendorId)
    this.setState({ items })
  }

  goBack = () => {
    this.props.history.push('/edit-vendor-codes')
  }

  createItem = async (item) => {
    let newItem = null
    if (item.categoryId) {
      newItem = await grpc.template.item.create(item)
      this.addItem(newItem)
      this.setShowCreateItem(false)
      this.setShowSelectItem(false)
      return
    }
  }

  createCategoryAndItem = async (categoryName, item) => {
    const newCategory = await grpc.template.category.create(categoryName) //{ categoryId, category }
  }

  addItem = (item) => {
    const items = [...this.state.items, item]
    this.setState({ items })
  }

  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack} />
        <EditItemsTable
          showCreateItem={this.state.showCreateItem}
          showSelectItem={this.state.showSelectItem}
          setShowCreateItem={this.setShowCreateItem}
          setShowSelectItem={this.setShowSelectItem}
          categories={this.state.categories}
          createItem={this.createItem}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentVendor: (vendorId) =>
      templateActions.itemPage.setCurrentVendor(dispatch, vendorId),
  }
}

export default connect(null, mapDispatchToProps)(EditItems)
