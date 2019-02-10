import React, {Component} from "react";
import Calendar from '../Calendar/Calendar'
import "./base.scss"

class App extends Component {
    render() {
        return (
            <Calendar calendarDay={new Date("2019-01-06")}>{day => day.getDate()}</Calendar>
        );
    }
}

export default App;