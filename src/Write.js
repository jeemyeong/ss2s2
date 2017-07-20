import React, { Component } from 'react';

class Write extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      files: [],
      writter: ''
    }
  }
  
  render() {
    console.log("render");
    const {visible} = this.props;
    if (!visible){
      return null;
    }
    return (
      <form>
        <input type="text" onChange={e => this.setState({text:e.target.value})}/>
        <br/>
        <input type="file"/>
        <br/>
        <input type="text"/>
        <br/>
        <button type="submit"/>
      </form>
    );
  }
}

export default Write;