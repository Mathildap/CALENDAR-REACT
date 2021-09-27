import React from 'react';
import { BiTrash } from 'react-icons/bi';

function Notes({ notes, onDelete }) {
    if (notes === undefined) {
        return <div className='aside-container loading'>Loading...</div>;
    } else {
        return (
            <article className='today-todo_container'>
                <h1>Notes</h1>
                {notes.map((note) => (
                    <div className='todo' key={note._id}>
                        <div>
                            {note.note}
                            {'  '}
                            <div>
                                <BiTrash
                                    style={{
                                        color: '#777777',
                                        cursor: 'pointer',
                                        marginLeft: '1px',
                                        marginRight: '-5px',
                                    }}
                                    onClick={() => onDelete(note._id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </article>
        );
    }
}

export default Notes;
