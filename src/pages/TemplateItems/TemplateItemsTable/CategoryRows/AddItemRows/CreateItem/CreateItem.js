import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell, Button } from '@material-ui/core'
import InputText from '@/components/InputText/InputText'
import InputImage from '@/components/InputImage/InputImage'
import InputNumber from '@/components/InputNumber/InputNumber'
import InputFloat from '@/components/InputFloat/InputFloat'

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
class CreateItem extends Component {
  constructor(props) {
    super(props)
    const state = {}
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

  handleOk = () => {
    const item = {}
    this.props.cells.forEach(
      (cell) => (item[cell.name] = this.state[cell.name]),
    )
    this.props.handleOk(item)
  }

  render() {
    return (
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
            style={{ textAlign: 'center', borderBottom: '2px solid #d0d0d0' }}
            colSpan={this.props.cells.length + 1}
          >
            <Button
              // disabled={this.isSaveDisabled()}
              variant='contained'
              color='primary'
              onClick={this.handleOk}
            >
              Сохранить товар
            </Button>
            <Button
              style={{ marginLeft: 20 }}
              variant='outlined'
              color='primary'
              onClick={this.props.handleCancel}
            >
              Отмена
            </Button>
          </TableCell>
        </TableRow>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    cells: state.templates.cells,
  }
}

export default connect(mapStateToProps)(CreateItem)
