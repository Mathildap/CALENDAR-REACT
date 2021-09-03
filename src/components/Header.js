import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function Header(month) {
    const back = () => {
        month.changeMonth('back');
    };

    const forward = () => {
        month.changeMonth('forward');
    };

    return (
        <header>
            <BiChevronLeft
                type='submit'
                onClick={back}
                className='header-arrow'
            />
            <h1>{month.month}</h1>
            <BiChevronRight
                type='submit'
                onClick={forward}
                className='header-arrow'
            />
        </header>
    );
}

export default Header;
