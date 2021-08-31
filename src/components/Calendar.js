import moment from 'moment';
import React from 'react';
import Days from './Days';
import EmptyDays from './EmptyDays';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function Calendar(days) {
    let currentDays = days.days;
    let emptyDays = days.firstDayOfMonth;
    let weekdayshort = moment.weekdaysShort(true);
    console.log(days);

    // HELP
    let blanks = [];
    for (let i = 0; i < emptyDays; i++) {
        blanks.push(i);
    }
    console.log(blanks);
    // HELP

    const weekdayshortname = weekdayshort.map((day) => {
        return (
            <div className='weekdays-day_cont' key={day}>
                {day}
            </div>
        );
    });

    return (
        <section className='calendar-container'>
            <div className='weekdays-container'>{weekdayshortname}</div>
            <div className='days-container'>
                {/* HELP  */}
                {blanks.map((blank) => (
                    <EmptyDays key={blank} blank={blank} />
                ))}
                {/* HELP  */}

                {currentDays.map((day) => (
                    <Days key={day} day={day} />
                ))}
            </div>
        </section>
    );
}

export default Calendar;
