import React from 'react';
import moment from 'moment';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function WeekLayout({ weekDates, todos, monthInNr }) {
    console.log(todos);
    console.log(monthInNr);
    let hoursInDay = [
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
        '24:00',
    ];

    let weekdayshort = moment.weekdaysShort(true);

    return (
        <div className='weekLayout'>
            <div className='weekLayout-container'>
                <div className='weekLayout-weekdays'>
                    {weekdayshort.map((day) => (
                        <div className='weekLayout-weekdays_day' key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className='weekLayout-column-container'>
                    {weekDates.map((date) => (
                        <div
                            className='weekLayout-column'
                            id={date + '-' + monthInNr}
                        >
                            <div className='weekLayout-dates' key={date}>
                                {date}
                            </div>

                            <div className='weekLayout-column-border'>
                                {hoursInDay.map((hour) => (
                                    <div
                                        className='weekLayout-hour_container'
                                        id={hour}
                                    >
                                        {hour}
                                        {todos
                                            .sort((a, b) =>
                                                b.time < a.time ? 1 : -1
                                            )
                                            .filter(
                                                (todo) =>
                                                    todo.date ===
                                                        date +
                                                            '-' +
                                                            monthInNr &&
                                                    todo.time === hour
                                            )
                                            .map((todo) => {
                                                console.log(
                                                    date + '-' + monthInNr,
                                                    ' ',
                                                    hour
                                                );
                                                return (
                                                    <div
                                                        className='inline day-todo'
                                                        id='colorHourDiv'
                                                        key={todo._id}
                                                    >
                                                        {todo.text}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeekLayout;
