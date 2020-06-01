import React, { Component } from 'react'
import { IconButton, Button } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import imageProcessor from '@/helpers/imageProcessor'
import classes from './InputImage.module.scss'
import { REQUEST } from '@/api'

class InputImage extends Component {
  state = {
    inputEl: React.createRef(),
    photo: '',
  }

  handleButtonClick = () => {
    this.state.inputEl.current.click()
  }

  handleInputChange = async (event) => {
    const photo = await imageProcessor(event.nativeEvent.target.files[0])
    const formData = new FormData()
    formData.append('photo', photo)
    const response = await REQUEST.insertImage(formData)
    const serverName = response.data[0]
    this.props.ready(serverName)
    this.setState({ photo: serverName })
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          style={{ display: 'none' }}
          accept='image/*'
          type='file'
          multiple={false}
          onChange={this.handleInputChange}
          ref={this.state.inputEl}
        />
        {this.state.photo ? (
          <Button
            onClick={this.handleButtonClick}
            style={{ maxWidth: 200, maxHeight: 300 }}
          >
            <img
              className={classes.image}
              src={this.state.photo}
              alt='изображение продукта'
            />
          </Button>
        ) : (
          <IconButton
            onClick={this.handleButtonClick}
            variant={this.props.variant}
            color={this.props.color}
          >
            <PhotoCamera />
          </IconButton>
        )}
      </div>
    )
  }
}

export default InputImage
