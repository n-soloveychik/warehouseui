import React from 'react'
import { IconButton, Button } from '@material-ui/core'
import classes from './Photo.module.scss'
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone'

const Photo = (props) => {
  return (
    <div className={props.className}>
      <img className={classes.img} src={props.src} alt={props.alt} />
      {props.cancelled ? (
        <div onClick={props.returnPhotoHandler} className={classes.cancelled}>
          Фото отменено
          <Button>Вернуть</Button>
        </div>
      ) : (
        <IconButton
          style={{ position: 'absolute' }}
          className={classes.cancel}
          onClick={props.cancelHandler}
        >
          <CancelTwoToneIcon style={{ color: 'white' }} />
        </IconButton>
      )}
    </div>
  )
}

export default Photo
