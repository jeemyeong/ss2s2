import React from 'react';
import Post from './Post';
import DayPicker from 'react-day-picker';
import Write from './Write'
import {observer, inject} from 'mobx-react';
import { Divider } from 'semantic-ui-react'

const App = inject("postStore")(observer(class App extends React.Component {

  render() {
    const state = this.props.postStore.postsState;
    const {postedDay, selectedDay} = state;
    return (
      <div className="App" style={appStyle}>
        <DayPicker
          numberOfMonths={window.innerWidth < 768
          ? 1
          : 2}
          selectedDays={selectedDay}
          modifiers
          ={{
          postedDay
        }}
          onDayClick={(clickedDay, modifiers, e) => this.props.postStore.clickDay(clickedDay, modifiers, e)}
          style={dayPickerStyle}/>
        <Post postStore={this.props.postStore.postsState}/>
        <Divider horizontal>Write</Divider>
        <Write addPost={this.props.postStore.addPost}/>
      </div>
    );
  }
}))

const dayPickerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "10"
}
const appStyle = {
  margin: "auto",
  textAlign: "center"
}

export default App;