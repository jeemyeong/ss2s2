import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends Component {
    render() {
				const posts = [
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
						date: new Date(2017,7,20),
						text: 'sampleText2',
						photoUrls: [
							"https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/18556414_1308793965884162_7638945388370838080_n.jpg?oh=d4a7d1540df814846919fc94fb6b1513&oe=5A0B5907"
						],
						writter: '이지명'
					}
				]
				const postedDay = [];
				posts.map(
					(e) => {
						postedDay.push(e.date);
					}
				)
				const modifiers = {
					postedDay,
				};
        return (
            <div className = "App" >
                <DayPicker
									modifiers={modifiers}
									month={new Date(2017,7)}
								/>
            </div>
        );
    }
}

export default App;