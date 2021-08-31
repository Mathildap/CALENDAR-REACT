import React from 'react';

function Today(day) {
    return (
        <article className='today-container'>
            <h2>{day.clickedDay}</h2>
            <h1>To do</h1>
        </article>
    );
}

export default Today;
