import moment from 'moment';
import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function Header(month) {
    let formatMonth = moment(month.month, 'MM-YYYY').format('MMMM YYYY');

    const back = () => {
        month.changeMonth('back');
    };

    const forward = () => {
        month.changeMonth('forward');
    };

    const logOutHandler = () => {
        month.logOut('');
    };

    return (
        <header>
            <div className='header-name_btn'>
                <div className='header-username'>{month.user}</div>
                <button onClick={logOutHandler}>Sign out</button>
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
