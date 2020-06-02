import React from 'react'
import { CircularProgress } from '@material-ui/core'

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Loading = () => {
  return (
    <div style={style} className='Loading'>
      <CircularProgress />
    </div>
  )
}

export default Loading
