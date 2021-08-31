import moment from 'moment';
import React from 'react';
import Days from './Days';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function Calendar(days) {
    let currentDays = days.days;

    let emptyDays = days.firstDayOfMonth;
    let parseDays = parseInt(emptyDays, 10);
    let blanks = [];
    for (let i = 0; i < parseDays; i++) {
        blanks.push(i);
    }

    let weekdayshort = moment.weekdaysShort(true);
    const weekdayshortname = weekdayshort.map((day) => {
        return (
            <div className='weekdays-day_cont' key={day}>
                {day}
            </div>
        );
    });

    const clickedDay = (answer) => {
        days.clickedDay(answer);
    };

    return (
        <section className='calendar-container'>
            <div className='weekdays-container'>{weekdayshortname}</div>
            <div className='days-container'>
                {blanks.map((blank, i) => (
                    <div key={i} className='days-day_cont empty'></div>
                ))}
                {currentDays.map((day) => (
                    <Days
                        key={days.month + day}
                        month={days.month}
                        day={day}
                        clickedDay={clickedDay}
                    />
                ))}
            </div>
        </section>
    );
}

export default Calendar;
