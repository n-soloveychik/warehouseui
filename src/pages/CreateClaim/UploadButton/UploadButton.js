import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import imagePropcessor from '@/helpers/imageProcessor'

class UploadButton extends Component {
  state = {
    inputEl: React.createRef(),
  }

  handleButtonClick = () => {
    this.state.inputEl.current.click()
  }

  handleInputChange = async (event) => {
    const photos = []
    for (const photo of event.target.files) {
      photos.push(await imagePropcessor(photo))
    }
    this.props.takePhotos(photos)
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          style={{ display: 'none' }}
          accept='image/*'
          type='file'
          multiple={true}
          onChange={this.handleInputChange}
          ref={this.state.inputEl}
        />
        <Button
          onClick={this.handleButtonClick}
          variant={this.props.variant}
          color={this.props.color}
          endIcon={<PhotoCamera />}
        >
          {this.props.buttonText}
        </Button>
      </div>
    )
  }
}

export default UploadButton
