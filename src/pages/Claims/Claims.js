import React, { Component } from 'react'
import CHeader from '@/components/CHeader/CHeader'

class Claims extends Component {
  goBack = () => {
    const params = this.props.match.params
    this.props.history.push(
      `/order/${params.order}/vendor-code/${params.vendor}`,
    )
  }
  render() {
    return (
      <div className='page'>
        <CHeader text='Назад' onTextClick={this.goBack}></CHeader>
      </div>
    )
  }
}

export default Claims
