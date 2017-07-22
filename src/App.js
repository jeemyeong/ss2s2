import React from 'react';
import Write from './Write';
import './App.css';
import DayPicker, { DateUtils } from 'react-day-picker';
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
				const date = JSON.stringify(e.date);
				if(!!state.postsByDay[date]){
					state.postsByDay[date].push(e)
					return null;
				}else{
					state.postsByDay[date] = []
					state.postsByDay[date].push(e)
					return null;
				}
			}
		)
		this.state = state;
	}
	
    render() {
		const { postedDay } = this.state;
		const modifiers = {
			postedDay
		};
        return (
            <div className = "App" >
							<Write
								visible={this.state.writeVisible}
							/>
							<DayPicker
								modifiers={modifiers}
								month={new Date(2017,7)}
								onDayClick={(clickedDay,modifiers,e) => this._click(clickedDay,modifiers,e)}
							/>
            </div>
        );
	}
	_click(clickedDay,modifiers,e) {
		const day = DateUtils.clone(clickedDay);
		day.setHours(clickedDay.getHours()-12);
		const stringifiedDay = JSON.stringify(day);
		const { postsByDay } = this.state;
		if(!!postsByDay[stringifiedDay]){
			console.log(postsByDay[stringifiedDay]);
		}
	}
}
export default App;