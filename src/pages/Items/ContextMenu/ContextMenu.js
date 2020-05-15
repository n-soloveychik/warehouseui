import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'

const ContextMenu = (props) => {
  return (
    <Menu
      onClose={props.handleClose}
      open={props.open}
      anchorEl={props.anchorEl}
    >
      <MenuItem onClick={() => props.createClaim(props.item.itemId)}>
        Новая претензия
      </MenuItem>
      {!!props.item && !!props.item.itemclaimsList.length && (
        <MenuItem onClick={() => props.openClaims(props.item.itemId)}>
          Все претензии ({props.item.itemclaimsList.length})
        </MenuItem>
      )}
    </Menu>
  )
}

export default ContextMenu
