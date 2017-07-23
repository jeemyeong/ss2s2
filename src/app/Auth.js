import React, {Component} from 'react';
import {Icon, Message, Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import authImage from '../assets/ss2s2.jpeg';

@observer
class Auth extends Component {
  render() {
    return (
      <AuthWrapper
        style={window.innerWidth < 768?authWrapperMobileStyle:authWrapperStyle}
      >
        <Image 
          src={authImage}
          size='medium'
          onClick={this.props.loginWithFacebook}
        />
        <Message icon>
          <Message.Content>
            <Message.Header>수빈이만 들어올 수 있습니다.</Message.Header>
            사진을 클릭해주세요😘
          </Message.Content>
          <Icon name='heart' loading/>
        </Message>
      </AuthWrapper>
    );
  }
}

const AuthWrapper = ({style, children}) => (
  <div style={style}>
    {children}
  </div>
)
const authWrapperStyle = {
  margin: "auto", align: "center", textAlign: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "10"
}
const authWrapperMobileStyle = {
  margin: "auto", align: "center", textAlign: "center",
  position: "fixed",
  top: "30%",
  left: "30%",
  transform: "translate(-20%, -20%)",
  zIndex: "10"
}

export default Auth;