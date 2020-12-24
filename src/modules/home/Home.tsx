import React, { Component } from 'react'


export default class Home extends Component<any> {
  componentDidMount() {
    this.props.history.push("/crawled-sellers")
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
