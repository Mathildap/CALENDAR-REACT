import React from 'react';

function Header(month) {
    const back = () => {
        month.changeMonth('back');
    };

    const forward = () => {
        month.changeMonth('forward');
    };

    return (
        <header>
            <button type='submit' onClick={back} className='header-arrow'>
                ←
            </button>
            <h1>{month.month}</h1>
            <button type='submit' onClick={forward} className='header-arrow'>
                →
            </button>
        </header>
    );
}

export default Header;
