import React, { Component } from 'react'


export default class Home extends Component<any> {
  componentDidMount() {
    this.props.history.push("/crawl-seller")
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
