import React, { Component } from 'react';
import { Button, Form, Input, Icon, Image } from 'semantic-ui-react'
import Dropzone from 'react-dropzone';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
      file: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.props.onCreatePost(this.props.userInfo, this.state.contents, this.state.file)
    this.setState({contents: '', file: null})
  }


  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles[0]!==undefined){
      this.setState({...this.state, file: acceptedFiles[0]});
    }else{
      console.log("ERROR");
    }
  }
  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={formStyle}
      >
        <Input
          style={inputBoxStyle}
          placeholder='하고 싶은 말😘'
          value={this.state.contents}
          onChange={e => this.setState({ contents: e.target.value })}
            />
        
        <Dropzone onDrop={this.onDrop} maxSize={2097152} accept={`image/*`} style={dropZoneStyle}>
          <div style={explanationStyle}>
            {this.state.file!==null?<Image src={this.state.file.preview}/>:<Icon name="image" size="big"/>}
          </div>
        </Dropzone>
        
        <Button
          type='submit'
          style={submitButtonStyle}>
          입력
        </Button>
        
      </Form>
    );
  }
}
const formStyle = {
  margin: "auto",
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "1000px"
}
const inputBoxStyle = {
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "50%"
}
const submitButtonStyle = {
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "50%"
}
const dropZoneStyle = {
  margin: "auto",
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "50%",
  height: "200px",
  borderWidth: "2px",
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: "5px",
  display: "table"
}
const explanationStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  textAlign: "center"
}


export default Write;