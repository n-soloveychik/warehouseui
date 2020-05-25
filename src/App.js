import React from 'react'
import Routes from '@/Routes/Routes'
import ErrorHandler from './components/ErrorHandler/ErrorHandler'

function App() {
  return (
    <>
      <Routes className='routes' />
      <ErrorHandler />
    </>
  )
}

export default App
