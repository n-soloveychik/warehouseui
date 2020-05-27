import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ authorized, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? <Component {...props} /> : <Redirect to='/login' />
      }
    ></Route>
  )
}

function mapStateToProps(state) {
  return {
    authorized: state.router.authorized,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
