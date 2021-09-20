import moment from 'moment';
import React from 'react';

function Days({ day, api, month, clickedDay, colorDayHandler, todos }) {
    let formatDate;
    let currentDay = moment().format('DD-MM-YYYY');
    if (day === '31') {
        formatDate = 31;
    } else {
        formatDate = moment(day, 'DD-MM-YYYY').format('D');
    }

    const clickedDayy = (e) => {
        if (e.target.id.length === 10) {
            let id = e.target.id;
            let date = id.slice(-2);
            let year = id.slice(-7, -2);
            let mon = id.replace(/ .*/, '');
            let theDay = { date: date, year: year, mon: mon, id: e.target.id };
            clickedDay(theDay);
            colorDayHandler(id);
        } else {
            let id = e.target.parentNode.id;
            let date = id.slice(-2);
            let year = id.slice(-7, -2);
            let mon = id.replace(/ .*/, '');
            let theDay = {
                date: date,
                year: year,
                mon: mon,
                id: e.target.parentNode.id,
            };
            clickedDay(theDay);
            colorDayHandler(id);
        }
    };

    const onMouseDown = (e) => {
        document.querySelectorAll('*').forEach(function (node) {
            node.classList.remove('clickedday');
        });
    };

    if (todos === undefined) {
        return <div></div>;
    } else {
        let id = day + '-' + month;
        let totalTodos = 0;
        let apiId = moment(id, 'DD-MM-YYYY').format('YYYY-MM-DD');

        return (
            <div
                onMouseDown={onMouseDown}
                onClick={clickedDayy}
                id={id}
                className={`${
                    id === currentDay
                        ? 'days-day_cont currentday'
                        : 'days-day_cont'
                }`}
            >
                <h3>
                    {formatDate}
                    {api
                        .filter((a) => a.datum === apiId)
                        .map((a) => {
                            return (
                                <span className='days-api' key={a.datum}>
                                    {a.helgdag}
                                </span>
                            );
                        })}
                </h3>
                {todos
                    .sort((a, b) => (b.time < a.time ? 1 : -1))
                    .filter((todo) => todo.date === id)
                    .map((todo) => {
                        totalTodos++;
                        return (
                            <div className='inline day-todo' key={todo._id}>
                                ・{todo.text}
                            </div>
                        );
                    })}
                <div className='days-todo_count'>
                    {totalTodos === 0 ? '' : totalTodos + ' Todo:'}
                </div>
            </div>
        );
    }
}

export default Days;
