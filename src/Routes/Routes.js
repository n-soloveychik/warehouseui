import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Warehouse from '@/pages/Warehouse/Warehouse'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/warehouse' component={Warehouse} />
    </Switch>
  )
}
