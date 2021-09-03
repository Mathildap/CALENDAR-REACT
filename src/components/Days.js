import moment from 'moment';
import React from 'react';

function Days({ day, month, clickedDay, colorDayHandler, todos }) {
    let formatDate = moment(day, 'DD-MM-YYYY').format('D');

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
        return (
            <div
                onMouseDown={onMouseDown}
                onClick={clickedDayy}
                id={id}
                className='days-day_cont'
            >
                {formatDate}
                {todos
                    .filter((todo) => todo.date === id)
                    .map((todo) => {
                        totalTodos++;
                        return (
                            <div className='inline' key={todo._id}>
                                ・{todo.text}
                            </div>
                        );
                    })}
                <div className='inline'>
                    {totalTodos === 0 ? '' : totalTodos + ' notes'}
                </div>
            </div>
        );
    }
}

export default Days;
