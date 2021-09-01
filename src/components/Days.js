import React from 'react';

function Days(day) {
    let month = day.month;
    let dy = day.day;

    const clickedDay = (e) => {
        let id = e.target.id;
        let date = id.slice(-2);
        let year = id.slice(-7, -2);
        let mon = id.replace(/ .*/, '');
        let theDay = { date: date, year: year, mon: mon, id: e.target.id };

        day.clickedDay(theDay);
        day.colorDayHandler(id);
    };

    const onMouseDown = (e) => {
        document.querySelectorAll('*').forEach(function (node) {
            node.classList.remove('clickedday');
        });
    };

    return (
        <div
            onMouseDown={onMouseDown}
            onClick={clickedDay}
            id={month + ' ' + dy}
            className='days-day_cont'
        >
            {day.day}
        </div>
    );
}

export default Days;
