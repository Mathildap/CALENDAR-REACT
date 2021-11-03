import moment from 'moment';
import React from 'react';
import { BiChevronLeft, BiChevronRight, BiCalendarWeek } from 'react-icons/bi';

function Header(month) {
    let formatMonth = moment(month.month, 'MM-YYYY').format('MMMM YYYY');

    const back = () => {
        month.changeMonth('back');
    };

    const forward = () => {
        month.changeMonth('forward');
    };

    const changeLayout = () => {
        console.log('change layout');
        month.weekLayoutHandler('change');
    };

    let myStr = month.user;
    let firstName = myStr.split(' ')[0];

    return (
        <header>
            <div className='header-name_btn'>
                <div className='header-username'>{firstName}</div>
                <div className='header-icon_btn'>
                    <BiCalendarWeek
                        className='header-calendar-icon'
                        onClick={changeLayout}
                    />
                    <button onClick={month.logOutHandler} className='logOutBtn'>
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
                <h1>{formatMonth}</h1>
                <BiChevronRight
                    type='submit'
                    onClick={forward}
                    className='header-arrow'
                />
            </div>
        </header>
    );
}

export default Header;
