import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Items from '@/pages/Items/Items'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Items} />
    </Switch>
  )
}
