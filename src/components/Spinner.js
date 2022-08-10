import React, { Component } from 'react'
import spinner from './spinner.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img style={{width:'45px', margin:'12px'}} src={spinner} alt="loading" />
      </div>
    )
  }
}
