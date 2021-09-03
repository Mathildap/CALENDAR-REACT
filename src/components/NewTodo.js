import React, { useState } from 'react';

function NewTodo(day) {
    let [change, setChange] = useState('');
    let [time, setTime] = useState('');

    const onChange = (e) => {
        setChange(e.target.value);
    };

    const timeHandler = (e) => {
        setTime(e.target.value);
    };

    const onSubmit = (e) => {
        let sendInfo = { text: change, time: time };

        e.preventDefault();
        day.inputToDo(sendInfo);
        setChange('');
        setTime();
        document.getElementById('appt').value = '';
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type='text'
                    value={change}
                    placeholder='New Todo'
                    id='newTodoInput'
                    maxLength='20'
                    required
                />
                <input
                    type='time'
                    id='appt'
                    name='appt'
                    onChange={timeHandler}
                />
                <button type='submit' id='newTodoBtn'>
                    +
                </button>
            </form>
        </div>
    );
}

export default NewTodo;
