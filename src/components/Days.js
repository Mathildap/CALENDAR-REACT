import React from 'react';

function Days(day) {
    let month = day.month;

    const clickedDay = (e) => {
        let id = e.target.id;
        let date = id.slice(-2);
        let year = id.slice(-7, -2);
        let mon = id.replace(/ .*/, '');
        let theDay = { date: date, year: year, mon: mon, id: e.target.id };

        day.clickedDay(theDay);
    };

    return (
        <div
            onClick={clickedDay}
            id={month + ' ' + '' + day.day}
            className='days-day_cont'
        >
            {day.day}
        </div>
    );
}

export default Days;
