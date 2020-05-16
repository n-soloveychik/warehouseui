import React, { Component } from 'react'
import { Button, TableRow, TableCell } from '@material-ui/core'
import InputText from './InputText/InputText'
import InputImage from './InputImage/InputImage'
import InputNumber from './InputNumber/InputNumber'
import InputFloat from './InputFloat/InputFloat'

const typeComponent = {
  string: (ready, notReady, { minLength, maxLength, title }) => (
    <InputText
      label={title}
      ready={ready}
      notReady={notReady}
      minLength={minLength}
      maxLength={maxLength}
    />
  ),
  image: (ready, notReady, { title }) => (
    <InputImage ready={ready} notReady={notReady} label={title} />
  ),
  number: (ready, notReady, { min, max, title }) => (
    <InputNumber
      ready={ready}
      notReady={notReady}
      min={min}
      max={max}
      label={title}
    />
  ),
  float: (ready, notReady, { min, max, title }) => (
    <InputFloat
      ready={ready}
      notReady={notReady}
      min={min}
      max={max}
      label={title}
    />
  ),
}

const singleCellStyle = {
  textAlign: 'center',
  borderBottom: '2px solid #d0d0d0',
}

class NewItemRows extends Component {
  constructor(props) {
    super(props)
    const state = {
      filling: false,
    }
    this.props.cells.forEach((cur) => {
      state[cur.name] = cur.default
    })
    this.state = state
  }

  setValue = (name, value) => {
    const newState = {}
    newState[name] = value
    this.setState(newState)
  }

  isSaveDisabled = () => {
    return !this.props.cells.reduce((bool, cell) =>
      cell.required ? bool && this.state[cell.name] !== cell.default : bool,
    )
  }

  render() {
    return (
      <>
        {this.state.filling ? (
          <>
            <TableRow>
              {this.props.cells &&
                this.props.cells.map((cell, index) => (
                  <TableCell key={index}>
                    {typeComponent[cell.type](
                      (value) => this.setValue(cell.name, value),
                      () => this.setValue(cell.name, cell.default),
                      cell,
                    )}
                  </TableCell>
                ))}
            </TableRow>
            <TableRow>
              <TableCell
                style={{ ...singleCellStyle }}
                colSpan={this.props.cells.length}
              >
                <Button
                  disabled={this.isSaveDisabled()}
                  variant='contained'
                  color='primary'
                >
                  {' '}
                  Сохранить товар
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  variant='contained'
                  color='primary'
                  onClick={() => this.setState({ filling: false })}
                >
                  {' '}
                  Отмена
                </Button>
              </TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell
              style={singleCellStyle}
              colSpan={this.props.cells.length}
              onClick={() => this.setState({ filling: true })}
            >
              <Button variant='contained' color='primary'>
                Новый товар
              </Button>
            </TableCell>
          </TableRow>
        )}
      </>
    )
  }
}

export default NewItemRows
