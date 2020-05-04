import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SelectArticul from '@/pages/SelectArticul/SelectArticul'
import Items from '@/pages/Items/Items'

export default function () {
  return (
    <Switch>
      <Route exact path='/items' component={Items} />
      <Route exact path='/' component={SelectArticul} />
    </Switch>
  )
}
