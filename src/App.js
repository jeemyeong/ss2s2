import React from 'react';
import Post from './Post';
import './App.css';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    const state = {
      posts: [
        {
          date: new Date(2017, 6, 22),
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
      selectedDay: new Date().toDateString()
    }
    state
      .posts
      .map((e) => {
        state
          .postedDay
          .push(e.date)
        const date = e
          .date
          .toDateString();
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
    const {postedDay} = this.state;
    const modifiers = {
      postedDay
    };
    return (
      <div className="App">
        <DayPicker
          modifiers={modifiers}
          month={new Date()}
          onDayClick={(clickedDay, modifiers, e) => this._click(clickedDay, modifiers, e)}/>
        <Post posts={this.state.postsByDay[this.state.selectedDay]}/>
      </div>
    );
  }
  _click(clickedDay, modifiers, e) {
    const day = DateUtils.clone(clickedDay);
    day.setHours(clickedDay.getHours() - 12);
    const stringifiedDay = day.toDateString();
    const {postsByDay} = this.state;
    if (!!postsByDay[stringifiedDay]) {
      console.log(postsByDay[stringifiedDay]);
    }
    this.setState({
      selectedDay: day.toDateString()
    })
  }
}
export default App;