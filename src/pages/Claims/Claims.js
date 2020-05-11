import React, { Component } from 'react'
import CHeader from '@/components/CHeader/CHeader'
import UploadButton from '@/components/UploadButton/UploadButton'
import { Typography, TextField, Button } from '@material-ui/core'
import classes from './Claims.module.scss'
import { grpc } from '@/grpc/index'

class Claims extends Component {
  state = {
    photos: [],
  }

  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(
      `/order/${params.order}/vendor-code/${params.vendor}`,
    )
  }

  getPhotos = async (photos) => {
    await this.setState({
      photos: [...photos.map((photo) => photo.base64), ...this.state.photos],
    })
    try {
      const name = await grpc.image.upload(photos[0].binary)
      console.log('filename: ', name)
    } catch (err) {
      console.log(err)
    }
    // grpc.items.setClaim({
    //   itemId: 2,
    //   images: this.state.photos,
    //   description: 'descr',
    // })
  }

  render() {
    const photos = this.state.photos.map((photo, index) => (
      <img className={classes.photo} key={index} src={photo} />
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
          />
          <div className={classes.buttons}>
            <UploadButton
              takePhotos={this.getPhotos}
              buttonText='Добавить фото'
            />
            <Button variant='outlined'>Отправить претензию</Button>
          </div>
          <div className={classes.gallery}>{photos}</div>
        </div>
      </div>
    )
  }
}

export default Claims
