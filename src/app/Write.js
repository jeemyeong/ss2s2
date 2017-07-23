import React, {Component} from 'react';
import {Button, Form, TextArea, Icon, Image} from 'semantic-ui-react'
import Dropzone from 'react-dropzone';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      photoFiles: []
    };
  }

  render() {
    const formStyle = {
      margin: "auto",
      marginBottom: "2em",
      width: window.innerWidth < 768
        ? "80%"
        : "50%"
    }
    return (
      <Form onSubmit={this.handleSubmit} style={formStyle}>
        <Form.Field
          control={TextArea}
          style={inputBoxStyle}
          placeholder='하고 싶은 말😘'
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}
          onKeyPress={e => e.key==='Enter'?this.handleSubmit(e):null}
          />

        <Dropzone
          onDrop={this.onDrop}
          maxSize={2097152}
          accept={`image/*`}
          style={dropZoneStyle}>
          <div style={explanationStyle}>
            {this.state.photoFiles.length > 0
              ? this
                .state
                .photoFiles
                .map((file, index) => <Image src={file.preview} key={index}/>)
              : <Icon name="image" size="big"/>}
          </div>
        </Dropzone>

        <Button type='submit' style={submitButtonStyle}>
          입력
        </Button>

      </Form>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addPost(
      this.state.text,
      this.state.photoFiles,
      this.props.authState.userInfo
    )
    this.setState({text: '', photoFiles: []})
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles[0] !== undefined) {
      this.setState({
        ...this.state,
        photoFiles: acceptedFiles
      });
    } else {
      console.log("ERROR");
    }
  }

}

const inputBoxStyle = {
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "100%"
}
const submitButtonStyle = {
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "100%"
}
const dropZoneStyle = {
  margin: "auto",
  marginTop: "0.2em",
  marginBottom: "0.2em",
  width: "100%",
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