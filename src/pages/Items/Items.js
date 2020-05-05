import React, { Component } from 'react'
import Lists from '@/components/Lists/Lists'
import CTable from '@/components/CTable/CTable'
import CHeader from '@/components/CHeader/CHeader'
import classes from './Items.module.scss'
import { IconButton, SwipeableDrawer } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

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
    return (
      <div className={classes.Items}>
        <CHeader></CHeader>
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

export default Items
