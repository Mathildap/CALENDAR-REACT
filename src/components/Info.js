import React, { useState, useEffect, useRef } from 'react';

function Info({ closeEdit }) {
    let editRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!editRef.current.contains(event.target)) {
                closeEdit('');
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    return (
        <div className='edit-container info-text' ref={editRef}>
            Add a new todo by clicking on a day. Enter your activity and time,
            then press ADD. <br />
            <br />
            You can change a todo by clicking on it, make your changes then
            press SAVE.
            <br />
            <br />
            You can delete a todo or mark a todo as completed. All todos that
            have not been completed can be seen below. <br />
            <br />
            You can write general notes that do not belong to a specific day.
        </div>
    );
}

export default Info;
