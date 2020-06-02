import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Typography, IconButton, ClickAwayListener } from '@material-ui/core'
import InputText from '@/components/InputText/InputText'
import InputNumber from '@/components/InputNumber/InputNumber'
import InputFloat from '@/components/InputFloat/InputFloat'
import ClearIcon from '@material-ui/icons/Clear'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '@/components/Loading/Loading'
import './EditShow.scss'
import { templateActions } from '@/redux/actions/actions'

const typeComponent = {
  string: (ready, notReady, defaultValue, { minLength, maxLength, title }) => (
    <InputText
      label={title}
      ready={ready}
      notReady={notReady}
      minLength={minLength}
      maxLength={maxLength}
      defaultValue={defaultValue}
    />
  ),
  number: (ready, notReady, defaultValue, { min, max, title }) => (
    <InputNumber
      ready={ready}
      notReady={notReady}
      min={min}
      max={max}
      label={title}
      defaultValue={defaultValue}
    />
  ),
  float: (ready, notReady, defaultValue, { min, max, title }) => (
    <InputFloat
      ready={ready}
      notReady={notReady}
      min={min}
      max={max}
      label={title}
      defaultValue={defaultValue}
    />
  ),
}

const EditShow = ({ item, cell, save, invoiceId }) => {
  const defaultValue = item[cell.name]

  const [edit, setEdit] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
  const [value, setValue] = useState(defaultValue)

  const isLoading = item[`${cell.name}_loading`] && item[`new_${cell.name}`]

  const ready = (newValue) => {
    setDisabledButton(false)
    setValue(newValue)
  }
  const notReady = (newValue) => {
    setDisabledButton(true)
    setValue(newValue)
  }

  const close = () => {
    setEdit(false)
    setDisabledButton(true)
    setValue(defaultValue)
  }

  const submit = async () => {
    save(invoiceId, item.item_id, cell.name, value)
    setEdit(false)
  }

  return edit && !isLoading ? (
    <ClickAwayListener onClickAway={close}>
      <div style={{ minWidth: 150 }}>
        {typeComponent[cell.type](ready, notReady, defaultValue, cell)}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={close}>
            <ClearIcon />
          </IconButton>
          <IconButton
            onClick={submit}
            disabled={disabledButton}
            color='primary'
          >
            <DoneIcon />
          </IconButton>
        </div>
      </div>
    </ClickAwayListener>
  ) : (
    <div
      style={{ position: 'relative' }}
      className={isLoading ? 'EditShow__loading' : ''}
    >
      {isLoading && <Loading />}
      <Typography onClick={() => setEdit(true)} style={{ cursor: 'pointer' }}>
        {item[`new_${cell.name}`] || item[cell.name]}
      </Typography>
    </div>
  )
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    save: (invoiceId, itemId, field, value) =>
      templateActions.items.updateField(dispatch, {
        invoiceId,
        itemId,
        field,
        newValue: value,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShow)
