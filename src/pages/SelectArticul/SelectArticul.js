import React, { Component } from 'react'
import { connect } from 'react-redux'
import Lists from '@/components/Lists/Lists'

function mapStateToProps(state) {
  return {
    currentAccountContract: state.currentAccountContract,
    currentArticule: state.currentArticule,
  }
}

class SelectArticul extends Component {
  componentDidMount() {
    console.log(this.props.currentAccountContract)
    console.log(this.props.currentArticule)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props)
    return true
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.currentAccountContract)
    console.log(this.props.currentArticule)
  }

  render() {
    return <Lists />
  }
}

export default connect(mapStateToProps)(SelectArticul)
