import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'
import CTable from '@/components/CTable/CTable'
import CHeader from '@/components/CHeader/CHeader'
import classes from './Items.module.scss'
import { IconButton, SwipeableDrawer } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {
  selectAccountContract,
  selectVendorCode,
} from '@/redux/actions/actions'

const table = [
  { type: 'Фанера' },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  { type: 'Фанера' },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  { type: 'Фанера' },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  { type: 'Фанера' },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  { type: 'Фанера' },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
  {
    place: '01-001',
    articul: '0000.0000.6543',
    image: '',
    size: '723*720*21',
    quantity: '1',
    mass: '6.5',
    comment: '3000 Огненно-красный',
  },
]

class Items extends Component {
  state = {
    sideOpened: false,
  }

  componentDidMount() {
    this.setStateFromQueryParams()
    this.openDrawerOnStart()
  }

  componentDidUpdate(prevProps, prevState) {
    this.setQueryParams()
    if (
      this.props.currentVendorCode &&
      prevProps.currentVendorCode !== this.props.currentVendorCode
    ) {
      this.closeSidebar()
    }
  }

  openDrawerOnStart() {
    let currentParams = new URLSearchParams(this.props.location.search)
    if (
      !currentParams.has('currentAccountContract') ||
      !currentParams.has('currentVendorCode')
    ) {
      this.setState({ sideOpened: true })
    }
  }

  setStateFromQueryParams() {
    let currentParams = new URLSearchParams(this.props.location.search)
    let accountContractFromQueryParams = currentParams.get(
      'currentAccountContract',
    )
    let vendorCodeFromQueryParams = currentParams.get('currentVendorCode')
    if (accountContractFromQueryParams) {
      this.props.selectAccountContract(accountContractFromQueryParams)
    }
    if (vendorCodeFromQueryParams) {
      this.props.selectVendorCode(vendorCodeFromQueryParams)
    }
  }

  setQueryParams() {
    let newParams = new URLSearchParams()
    let currentParams = new URLSearchParams(this.props.location.search)
    if (this.props.currentAccountContract) {
      newParams.append(
        'currentAccountContract',
        this.props.currentAccountContract,
      )
    }
    if (this.props.currentVendorCode) {
      newParams.append('currentVendorCode', this.props.currentVendorCode)
    }
    if (
      newParams.toString() &&
      newParams.toString() !== currentParams.toString()
    ) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: newParams.toString(),
      })
    }
  }

  toggleSidebar = () => {
    this.setState({
      sideOpened: !this.state.sideOpened,
    })
  }

  openSidebar = () => {
    this.setState({
      sideOpened: true,
    })
  }

  closeSidebar = () => {
    this.setState({
      sideOpened: false,
    })
  }

  render() {
    const headerText = this.props.currentVendorCode
      ? `${this.props.currentAccountContract} / ${this.props.currentVendorCode}`
      : 'Открыть артикул'
    return (
      <div className={classes.Items}>
        <CHeader text={headerText} onTextClick={this.openSidebar}></CHeader>
        <CTable data={table}></CTable>
        <IconButton
          style={{ position: 'absolute' }}
          className={classes.IconButton}
          onClick={this.toggleSidebar}
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <SwipeableDrawer
          onOpen={this.openSidebar}
          onClose={this.closeSidebar}
          className={classes.Side}
          open={this.state.sideOpened}
        >
          <Lists></Lists>
          <IconButton
            onClick={this.toggleSidebar}
            style={{ position: 'absolute' }}
            className={classes['Side-IconButton']}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </IconButton>
        </SwipeableDrawer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentAccountContract: state.warehouse.currentAccountContract,
    currentVendorCode: state.warehouse.currentVendorCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectAccountContract: (id) => dispatch(selectAccountContract(id)),
    selectVendorCode: (id) => dispatch(selectVendorCode(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
