import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SelectArticul from '@/pages/SelectArticul/SelectArticul'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={SelectArticul} />
    </Switch>
  )
}
