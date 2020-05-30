import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'

const CHeader = (props) => {
  const [opened, setOpened] = useState(false)
  const menuItems = props.menuItems?.map((item, index) => (
    <ListItem key={index} component={Link} to={item.link}>
      {item.name}
    </ListItem>
  ))
  return (
    <AppBar position='fixed'>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button style={{ color: 'white' }}>
          <Typography onClick={props.onTextClick} variant='h6'>
            {props.text}
          </Typography>
        </Button>
        <IconButton onClick={() => setOpened(true)} style={{ color: 'white' }}>
          <MenuOpenIcon />
        </IconButton>
        <SwipeableDrawer
          anchor='right'
          onOpen={() => setOpened(true)}
          open={opened}
          onClose={() => setOpened(false)}
        >
          <List style={{ width: 300, paddingTop: 30 }}>{menuItems}</List>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  )
}

export default CHeader
