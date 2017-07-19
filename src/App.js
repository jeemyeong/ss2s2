import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends Component {
    render() {
        return (
            <div className = "App" >
                <DayPicker/>
            </div>
        );
    }
}

export default App;