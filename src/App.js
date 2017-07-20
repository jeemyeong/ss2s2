import React from 'react';
import Write from './Write';
import './App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends React.Component {
	constructor (props) {
		super(props)
		const state = {
			posts: [
				{
					date: new Date(2017,7,19),
					text: 'sampleText1',
					photoUrls: [
						"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18952672_1325477787549113_3739752028675042452_n.jpg?oh=b4f408c9b72623353f6d7f01ff22b8eb&oe=5A0F11F1",
						"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18556414_1308793965884162_7638945388370838080_n.jpg?oh=d4a7d1540df814846919fc94fb6b1513&oe=5A0B5907"
					],
					writter: '이지명'
				},
				{
					date: new Date(2017,7,19),
					text: 'sampleText2',
					photoUrls: [
						"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18556414_1308793965884162_7638945388370838080_n.jpg?oh=d4a7d1540df814846919fc94fb6b1513&oe=5A0B5907"
					],
					writter: '이지명'
				}
			],
			writeVisible:false,
			postedDay: [],
			postsByDay: {}
		}
		state.posts.map(
			(e) => {
				state.postedDay.push(e.date)
				if(!!state.postsByDay[e.date]){
					state.postsByDay[e.date].push(e)
				}else{
					state.postsByDay[e.date] = []
					state.postsByDay[e.date].push(e)
				}
			}
		)
		this.state = state;
		console.log(this.state);
	}
	
    render() {
		const {postedDay} = this.state;
		const modifiers = {
			postedDay,
		};
        return (
            <div className = "App" >
							<Write
								visible={this.state.writeVisible}
							/>
							<DayPicker
								modifiers={modifiers}
								month={new Date(2017,7)}
								onDayClick={(day,modifiers,e) => this._click(day,modifiers,e)}
							/>
            </div>
        );
	}
	_click(day,modifiers,e) {
		// this.setState({writeVisible : true})
		const {postsByDay} = this.state;
		console.log(day);
		const strDay = JSON.stringify(day);
		console.log(postsByDay);
		console.log([postsByDay["Sat Aug 19 2017 12:00:00 GMT+0900 (KST)"]]);
	}
}

export default App;