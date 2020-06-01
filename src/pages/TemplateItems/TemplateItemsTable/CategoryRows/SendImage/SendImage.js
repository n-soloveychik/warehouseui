import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconButton, Button } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import imageProcessor from '@/helpers/imageProcessor'
import { REQUEST } from '@/api'
import { errorActions, templateActions } from '@/redux/actions/actions'
import { ROUTER } from '@/redux/actions/actionNames'

const style = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    maxHeight: 200,
    maxWidth: 200,
  },
  image: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

class SendImage extends Component {
  state = {
    inputEl: React.createRef(),
    photo: '',
  }

  componentDidMount() {
    if (this.props.src) {
      this.setState({ photo: this.props.src })
    }
  }

  componentDidUpdate() {
    if (this.props.src !== this.state.photo) {
      this.setState({ photo: this.props.src })
    }
  }

  handleButtonClick = () => {
    this.state.inputEl.current.click()
  }

  handleInputChange = async (event) => {
    const photo = await imageProcessor(event.nativeEvent.target.files[0])
    const formData = new FormData()
    formData.append('photo', photo)
    let response = await REQUEST.insertImage(formData)
    if (response === 401) {
      this.props.unauthorized()
      return
    }
    if (response.status > 199 && response.status < 300) {
      const serverName = response.data[0]
      this.props.uploadImage({
        itemId: this.props.item.item_id,
        invoiceId: this.props.invoiceId,
        image: serverName,
      })
      return
    }
    this.props.showError(response.status, response.data?.message)
  }

  render() {
    return (
      <div style={style.div} title='Нажмите, чтобы изменить'>
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
              style={style.image}
              src={this.state.photo}
              alt={this.props.alt}
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

function mapDispatchToProps(dispatch) {
  return {
    uploadImage: ({ itemId, invoiceId, image }) =>
      templateActions.items.updateImage(dispatch, {
        itemId,
        invoiceId,
        image,
      }),
    showError: (title, text) => errorActions.showError(dispatch, title, text),
    unauthorized: () => dispatch({ type: ROUTER.UNAUTHORIZED }),
  }
}

export default connect(null, mapDispatchToProps)(SendImage)
