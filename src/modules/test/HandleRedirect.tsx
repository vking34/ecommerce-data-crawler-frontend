import React, { Component } from 'react'

export default class HandleRedirect extends Component<any> {
  componentDidMount() {
    this.props.history.push("/");
  }
  render() {
    return (<div></div>)
  }
}
