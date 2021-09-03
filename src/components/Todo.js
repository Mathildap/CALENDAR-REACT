import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';

function Todo({ todo, onDelete, onToggle }) {
    return (
        <div className='todo'>
            <div className={`${todo.reminder ? 'reminder' : ''}`}>
                <span className='todo-text'>{todo.text}</span>
                <span className='todo-time_date'>{todo.time}</span>
                <span className='todo-time_date'>{todo.date}</span>
                <div>
                    <BiCheck
                        style={{
                            color: '#777777',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                        }}
                        onClick={() => onToggle(todo._id)}
                    />
                    <BiTrash
                        style={{
                            color: '#777777',
                            cursor: 'pointer',
                            marginLeft: '1px',
                            marginRight: '-5px',
                        }}
                        onClick={() => onDelete(todo._id)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Todo;
