import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SelectArticule from '@/pages/SelectArticul/SelectArticule'
import Items from '@/pages/Items/Items'

export default function () {
  return (
    <Switch>
      <Route exact path='/items' component={Items} />
      <Route exact path='/' component={SelectArticule} />
    </Switch>
  )
}
