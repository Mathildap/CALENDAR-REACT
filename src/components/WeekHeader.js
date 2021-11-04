import React, { useState } from 'react';

import { BiChevronLeft, BiChevronRight, BiCalendar } from 'react-icons/bi';

function WeekHeader({
    week,
    changeWeek,
    weekLayoutHandler,
    user,
    logOutHandler,
}) {
    let [weekLayout, setWeekLayout] = useState(false);

    const back = () => {
        changeWeek('back');
    };

    const forward = () => {
        changeWeek('forward');
    };

    const changeLayout = () => {
        setWeekLayout(!weekLayout);
        weekLayoutHandler('change');
    };

    let myStr = user;
    let firstName = myStr.split(' ')[0];

    return (
        <header>
            <div className='header-name_btn'>
                <div className='header-username'>{firstName}</div>
                <div className='header-icon_btn'>
                    <BiCalendar
                        className='header-calendar-icon'
                        onClick={changeLayout}
                    />
                    <button onClick={logOutHandler} className='logOutBtn'>
                        Sign out
                    </button>
                </div>
            </div>
            <div className='header'>
                <BiChevronLeft
                    type='submit'
                    onClick={back}
                    className='header-arrow'
                />
                <h1>Week {week}</h1>
                <BiChevronRight
                    type='submit'
                    onClick={forward}
                    className='header-arrow'
                />
            </div>
        </header>
    );
}

export default WeekHeader;
