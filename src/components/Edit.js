import React, { useState, useEffect, useRef } from 'react';

function Edit({ todo, updatedTodo, closeEdit }) {
    let [theTodo, setTheTodo] = useState(todo);
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

    const onChange = (event) => {
        setTheTodo((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updatedTodo(theTodo);
    };

    return (
        <div className='edit-container' ref={editRef}>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    value={theTodo.text}
                    onChange={onChange}
                    id='text'
                />
                <br />
                <input
                    type='time'
                    value={theTodo.time}
                    onChange={onChange}
                    id='time'
                />
                <br />

                <input
                    type='text'
                    value={theTodo.date}
                    onChange={onChange}
                    id='date'
                />
                <br />

                <button type='submit'>Save</button>
            </form>
        </div>
    );
}

export default Edit;
