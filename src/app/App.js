import React from 'react';
import Post from './Post';
import DayPicker from 'react-day-picker';
import Write from './Write'

class App extends React.Component {
  constructor(props) {
    super(props)
    const state = {
      posts: [
        {
          date: new Date(2017, 6, 21),
          text: 'sampleText1',
          photoUrls: [
            "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18952672_1325477787549113_37397520" +
                "28675042452_n.jpg?oh=b4f408c9b72623353f6d7f01ff22b8eb&oe=5A0F11F1",
            "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18556414_1308793965884162_76389453" +
                "88370838080_n.jpg?oh=d4a7d1540df814846919fc94fb6b1513&oe=5A0B5907"
          ],
          writter: '이지명'
        }, {
          date: new Date(2017, 6, 22),
          text: 'sampleText2',
          photoUrls: ["https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18556414_1308793965884162_76389453" +
              "88370838080_n.jpg?oh=d4a7d1540df814846919fc94fb6b1513&oe=5A0B5907"],
          writter: '이지명'
        }
      ],
      postedDay: [],
      postsByDay: {},
      StringifiedSelectedDay: new Date().toLocaleDateString(),
      selectedDay: new Date()
    }
    state
      .posts
      .map((e) => {
        state
          .postedDay
          .push(e.date)
        const date = e
          .date
          .toLocaleDateString();
        if (!!state.postsByDay[date]) {
          state
            .postsByDay[date]
            .push(e)
          return null;
        } else {
          state.postsByDay[date] = []
          state
            .postsByDay[date]
            .push(e)
          return null;
        }
      })
    this.state = state;
  }

  render() {
    const {postedDay, postsByDay, StringifiedSelectedDay, selectedDay} = this.state;
    
    return (
      <div className="App" style={appStyle}>
        <DayPicker
          numberOfMonths={window.innerWidth < 768? 1 : 2}
          selectedDays={selectedDay} 
          modifiers ={{postedDay}}
          onDayClick={(clickedDay, modifiers, e) => this._click(clickedDay, modifiers, e)}
          style={dayPickerStyle}/>
        <div>
          {StringifiedSelectedDay}
        </div>
        <Write/>
        <Post posts={postsByDay[StringifiedSelectedDay]}/>
      </div>
    );
  }
  _click(clickedDay, modifiers, e) {
    this.setState({
      StringifiedSelectedDay: clickedDay.toLocaleDateString(),
      selectedDay: clickedDay
    })
  }
}

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