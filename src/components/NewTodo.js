import React, { useState } from 'react';

function NewTodo(day) {
    let [change, setChange] = useState('');
    let [time, setTime] = useState('');
    let [timeTo, setTimeTo] = useState('');

    const onChange = (e) => {
        setChange(e.target.value);
    };

    const timeHandler = (e) => {
        setTime(e.target.value);
    };

    const timeHandlerTo = (e) => {
        setTimeTo(e.target.value);
    };

    const onSubmit = (e) => {
        let sendInfo = { text: change, time: time, timeTo: timeTo };

        e.preventDefault();
        day.inputToDo(sendInfo);
        setChange('');
        setTime();
        setTimeTo();
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
                    maxLength='30'
                    required
                />
                <div className='time_addBtn'>
                    <div>
                        <input
                            type='time'
                            id='appt'
                            className='appt'
                            name='appt'
                            onChange={timeHandler}
                        />
                        <span>{' - '}</span>
                        <input
                            type='time'
                            id='apptTo'
                            className='appt'
                            name='apptTo'
                            onChange={timeHandlerTo}
                        />
                    </div>
                    <button type='submit' id='newTodoBtn'>
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewTodo;
