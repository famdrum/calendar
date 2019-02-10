import React, {Component} from "react";
import {setDate, addMonths, getDaysInMonth, getYear} from "date-fns";
import "./calendar.scss"

const chunk = (array, size = 1) => {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const generateCalendarModel = (calendarDay, startDay = 1) => {
    const DAYS_OF_THE_WEEK = 7; //Константа, що задає кількість днів в тиждні.
    let currentDate = calendarDay; //Вибираєм поточну дату.
    const numberOfDays = getDaysInMonth(currentDate); //Скільки днів в поточному місяці.

    //Визначимо з якого дня тиждня розпочинається наш місяць.
    currentDate.setDate(1);
    let firstDayOfWeek = currentDate.getDay();

    // Скоректуємо день початку тиждня відповідно стартового дня
    // (тиждень може розпочинатись з понеділка, вівторка, чи будь-якого іншого дня)
    firstDayOfWeek =
        (DAYS_OF_THE_WEEK - (startDay - firstDayOfWeek)) % DAYS_OF_THE_WEEK;

    // Згенеруємо масив, який буде відображенням нашого поточного місяця.
    let month = [
        ...new Array(firstDayOfWeek).fill(), // "префікс-масив"
        ...new Array(numberOfDays).fill().map((el, i) => setDate(currentDate, i + 1)) // Календар
    ];

    return chunk(month, DAYS_OF_THE_WEEK); //Розбиваємо місяць на тиждні
};

class Calendar extends Component {
    constructor(props) {
        super(props);
        const {calendarDay} = props;
        this.state = {
            calendarDay: calendarDay,
        };
        this.month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
    }

    render() {
        const {calendarDay} = this.state;
        const {children} = this.props;

        this.model = generateCalendarModel(calendarDay);

        return (
            <div className="Calendar">
                <header className="Calendar__header">
                    <button
                        onClick={() => {
                            this.setState({calendarDay: addMonths(calendarDay, -1)});
                        }}
                        className="Calendar__button"
                    >
                        ◄
                    </button>
                    <button
                        onClick={() => {
                            this.setState({calendarDay: addMonths(calendarDay, 1)});
                        }}
                        className="Calendar__button"
                    >
                        ►
                    </button>
                </header>
                <h3 className={"Calendar__current-month"}>―  {this.month[calendarDay.getMonth()]} {getYear(calendarDay)}  ―</h3>
                <ul className={"Calendar__week-days-list"}>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                    <li>Sun</li>
                </ul>
                <div className={"Calendar__days"}>
                    {this.model.map(week =>
                        week.map((day, index) => (
                                <>
                                    <span id={index} className="Calendar__day">{day ? children(day) : "·"}</span>
                                    {index==6 ? <br/> : ""}
                                </>
                            )
                        )
                    )}
                </div>
            </div>
        );
    }
}

export default Calendar;