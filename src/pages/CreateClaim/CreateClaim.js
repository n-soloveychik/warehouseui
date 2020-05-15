import React, { Component } from 'react'
import { connect } from 'react-redux'
import CHeader from '@/components/CHeader/CHeader'
import UploadButton from '@/pages/CreateClaim/UploadButton/UploadButton'
import {
  Typography,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core'
import classes from './CreateClaim.module.scss'
import Photo from './Photo/Photo'
import { grpc } from '@/grpc/index'

class CreateClaim extends Component {
  state = {
    photos: [],
    description: '',
  }

  changePhotoCanselStatus = (index, cancelled) => {
    const photos = [...this.state.photos]
    photos[index].cancelled = cancelled
    this.setState({ photos })
  }

  cancelPhoto = (index) => {
    this.changePhotoCanselStatus(index, true)
  }
  returnPhoto = (index) => {
    this.changePhotoCanselStatus(index, false)
  }

  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(
      `/order/${params.order}/vendor-code/${params.vendor}`,
    )
  }

  countPhotoSend = () => {
    return this.state.photos.reduce(
      (acc, cur) => (cur.cancelled ? acc : acc + 1),
      0,
    )
  }

  isSendDisabled = () => {
    return !this.countPhotoSend() || !this.state.description.length
  }

  changeDescription = (event) => {
    const description = event.target.value
    const newLen = description.length
    if (newLen > 300) return
    this.setState({ description })
  }

  takePhotos = async (photos) => {
    this.setState({ photos: [...this.state.photos, ...photos] })
    for (const photo of photos) {
      try {
        if (!photo.serverName) {
          photo.serverName = await grpc.image.upload(photo.binary)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  createClaim = async () => {
    const itemId = this.props.match.params.item
    const images = this.state.photos.map((photo) => photo.serverName)
    const description = this.state.description
    await grpc.claim.create({ itemId, images, description })
    this.goBack()
  }

  render() {
    const photos = this.state.photos.map((photo, index) => (
      <Photo
        alt='Фото претензии'
        className={classes.photo}
        key={index}
        src={photo.base64}
        cancelled={photo.cancelled}
        cancelHandler={this.cancelPhoto.bind(this, index)}
        returnPhotoHandler={this.returnPhoto.bind(this, index)}
      />
    ))
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack}></CHeader>
        <div className={classes.content}>
          <Typography style={{ marginTop: 30 }} align='center' variant='h4'>
            Претензии
          </Typography>
          <Typography style={{ marginBottom: 30 }} align='center' variant='h5'>
            Опишите претензию и добавьте фото
          </Typography>

          <TextField
            className={classes.textField}
            label='Описание претензии'
            multiline
            rows={4}
            variant='outlined'
            style={{ marginBottom: 20 }}
            onChange={this.changeDescription}
            value={this.state.description}
          ></TextField>
          <FormHelperText
            style={{
              transform: 'translate(-50%, -100%)',
              width: 'calc(100vw - 16px * 2)',
              maxWidth: 880,
              left: '50%',
              position: 'relative',
              textAlign: 'right',
            }}
          >
            {this.state.description.length} / 300
          </FormHelperText>
          <div className={classes.buttons}>
            <UploadButton
              takePhotos={this.takePhotos}
              buttonText='Добавить фото'
              variant={this.countPhotoSend() ? 'outlined' : 'contained'}
              color={this.countPhotoSend() ? 'default' : 'primary'}
            />
            <Button
              disabled={this.isSendDisabled()}
              variant={this.isSendDisabled() ? 'text' : 'contained'}
              color='primary'
              onClick={this.createClaim}
            >
              Отправить претензию
            </Button>
          </div>
          <div className={classes.gallery}>{photos}</div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(null, mapDispatchToProps)(CreateClaim)
