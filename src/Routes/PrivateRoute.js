import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ authorized, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return authorized ? <Component {...props} /> : <Redirect to='/login' />
      }}
    />
  )
}

function mapStateToProps(state) {
  return {
    authorized: state.router.authorized,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
