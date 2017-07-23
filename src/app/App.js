import React from 'react';
import Post from './Post';
import Write from './Write'
import Auth from './Auth'
import DayPicker from 'react-day-picker';
import {observer, inject} from 'mobx-react';
import {Divider} from 'semantic-ui-react'
import {auth} from '../database/database';

@inject("postStore")
@inject("authStore")
@observer
class App extends React.Component {
  componentDidMount() {
    this.removeListener = auth().onAuthStateChanged((user) => {
      if (user) {
        this
          .props
          .authStore
          .setAuthState(user);
      }
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    const {loginWithFacebook, authState} = this.props.authStore;
    const {authed} = authState;
    if(!authed){
      return (<Auth loginWithFacebook={loginWithFacebook}/>)
    }
    const appStyle = {
      margin: "auto",
      textAlign: "center",
      width: window.innerWidth < 768
        ? "100%"
        : "90%"
    }

    const {postedDay, selectedDay} = this.props.postStore.postsState;
    
    return (
      <div className="App" style={appStyle}>
        <DayPicker
          numberOfMonths={window.innerWidth < 768
          ? 1
          : 2}
          selectedDays={selectedDay}
          modifiers
          ={{
          postedDay: postedDay.slice()
        }}
          onDayClick={(clickedDay, modifiers, e) => this.props.postStore.clickDay(clickedDay, modifiers, e)}
          style={dayPickerStyle}/>
        <Post
          postsState={this.props.postStore.postsState}
          deletePost={this.props.postStore.deletePost}/>
        <Divider horizontal>Write</Divider>
        <Write 
          addPost={this.props.postStore.addPost}
          authState={this.props.authStore.authState}
        />
      </div>
    );
  }
}

const dayPickerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "10"
}

export default App;