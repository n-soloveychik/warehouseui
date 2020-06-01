import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Typography } from '@material-ui/core'
import classes from './Login.module.scss'
import { errorActions, loginActions } from '@/redux/actions/actions'

class Login extends Component {
  constructor(props) {
    super(props)
    if (localStorage.getItem('token')) {
      this.props.checkToken()
    }
    this.inputEmail = createRef()
    this.state = {
      showError: false,
      fields: {
        email: {
          value: '',
          touched: false,
          valid: true,
          element: createRef(),
          errors: {
            valueMissing: 'Введите email',
            typeMismatch: 'Неправильный email',
          },
          errorMessage: ' ',
        },
        password: {
          value: '',
          touched: false,
          valid: true,
          element: createRef(),
          errors: {
            valueMissing: 'Введите пароль',
            tooShort: 'Минимальная длина пароля - 5 символов',
            tooLong: 'Максимальная длина пароля - 150 символов',
          },
          errorMessage: ' ',
        },
      },
    }
  }

  disableButton = () => {
    return !Object.values(this.state.fields).reduce(
      (bool, control) => bool && control.valid,
      true,
    )
  }

  submit = async (e) => {
    e.preventDefault()
    const device = `${window.navigator.appCodeName}-${window.navigator.platform}`
    if (this.validateAll()) {
      await this.props.login({
        email: this.state.fields.email.value,
        password: this.state.fields.password.value,
        device,
      })
      if (!localStorage.getItem('token')) {
        this.setState({ showError: true })
      }
    }
  }

  validateAll = () => {
    const newState = { ...this.state }
    const controls = Object.values(newState.fields)

    const result = controls.reduce((bool, control) => {
      this.checkValidation(control)
      control.touched = true
      return bool && control.valid
    }, true)
    this.setState(newState)
    return result
  }

  handleBlur = (e) => {
    const newState = { ...this.state }
    const name = e.target.name
    const control = newState.fields[name]
    control.touched = true
    this.checkValidation(control)
    this.setState(newState)
  }

  checkValidation(control) {
    const element = control.element.current
    element.checkValidity()
    control.valid = element.validity.valid
    if (!control.valid) {
      control.errorMessage = Object.keys(control.errors).reduce(
        (str, key) => (element.validity[key] ? str + control.errors[key] : str),
        '',
      )
    } else {
      control.errorMessage = ' '
    }
  }

  handleChange = (e) => {
    const newState = { ...this.state }
    newState.showError = false
    const control = newState.fields[e.target.name]
    control.value = e.target.value

    if (control.touched) {
      this.checkValidation(control)
    }

    this.setState(newState)
  }

  render() {
    return (
      <form noValidate onSubmit={this.submit} className={classes.form}>
        <Typography
          variant='h5'
          className={classes.title}
          style={{ marginBottom: 20, fontWeight: 100 }}
        >
          Вход
        </Typography>
        {this.state.showError && (
          <Typography
            variant='body2'
            style={{ color: 'red', textAlign: 'center', marginBottom: 30 }}
          >
            Неверный логин или пароль
          </Typography>
        )}
        <TextField
          label='email'
          name='email'
          type='email'
          required
          inputRef={this.state.fields.email.element}
          value={this.state.fields.email.value}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.handleBlur(e)}
          helperText={this.state.fields.email.errorMessage}
          error={!this.state.fields.email.valid}
          className={classes.input}
        />
        <TextField
          label='password'
          name='password'
          type='password'
          required
          inputProps={{ minLength: 5, maxLength: 150 }}
          inputRef={this.state.fields.password.element}
          value={this.state.fields.password.value}
          onChange={(e) => this.handleChange(e)}
          onBlur={(e) => this.handleBlur(e)}
          helperText={this.state.fields.password.errorMessage}
          error={!this.state.fields.password.valid}
          className={classes.input}
        />
        <Button
          disabled={this.disableButton()}
          variant='contained'
          color='primary'
          type='submit'
        >
          Войти
        </Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    showError: (title, text) => errorActions.showError(dispatch, title, text),
    login: (loginData) => loginActions.login(dispatch, loginData),
    checkToken: () => loginActions.checkToken(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
