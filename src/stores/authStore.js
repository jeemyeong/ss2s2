import { observable, action } from 'mobx';
import { auth } from '../database/database';

export class AuthStore {
  @observable
  authState = {
    authed: false,
  };

  @action
  loginWithFacebook = () => {
    const provider = new auth.FacebookAuthProvider()
    auth().signInWithPopup(provider)
  }
  @action
  setAuthState = (user) => {
    const userInfo= {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }
    const state = {
      authed: true,
      userInfo
    }
    this.authState = state;
  }

}

export default new AuthStore();