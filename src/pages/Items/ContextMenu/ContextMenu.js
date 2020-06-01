import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'

const ContextMenu = (props) => {
  return (
    <Menu
      onClose={props.handleClose}
      open={props.open}
      anchorEl={props.anchorEl}
    >
      <MenuItem onClick={() => props.createClaim(props.item?.item_id)}>
        Новая претензия
      </MenuItem>
      {!!props.item?.claims?.length && (
        <MenuItem onClick={() => props.openClaims(props.item?.item_id)}>
          Все претензии ({props.item?.claims?.length || 0})
        </MenuItem>
      )}
    </Menu>
  )
}

export default ContextMenu
