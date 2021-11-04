import React, { useState } from 'react';

function NewNote({ newNote }) {
    let [change, setChange] = useState('');

    const onChange = (e) => {
        setChange(e.target.value);
    };

    const onSubmit = (e) => {
        let sendInfo = change;

        e.preventDefault();
        newNote(sendInfo);
        setChange('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type='text'
                    value={change}
                    placeholder='New Note'
                    id='newNoteInput'
                    required
                />
                <button type='submit' id='newNoteBtn'>
                    add
                </button>
            </form>
        </div>
    );
}

export default NewNote;
