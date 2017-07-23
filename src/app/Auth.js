import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react'
import {observer} from 'mobx-react';

@observer
class Auth extends Component {
  render() {
    return (
      <ButtonWrapper>
        <Button
          color='facebook'
          onClick={this.props.loginWithFacebook}>
          <Icon name='facebook' /> Facebook
        </Button>
      </ButtonWrapper>
    );
  }
}

const ButtonWrapper = ({children}) => (
  <div
    style={buttonWrapperStyle}
  >
    {children}
  </div>
)

const buttonWrapperStyle = {
  // margin: "auto",
  // align: "center",
  // textAlign: "center"
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "10"
}

export default Auth;