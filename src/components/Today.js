import moment from 'moment';
import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';

function Today({ clickedDay, todos, onDelete, onToggle, editTodo }) {
    let formatDate = moment(clickedDay, 'DD-MM-YYYY').format('D MMMM YY');

    if (todos === undefined) {
        return <div className='aside-container loading'>Loading...</div>;
    } else {
        return (
            <article className='today-todo_container'>
                <h1>{formatDate}</h1>
                {todos
                    .sort((a, b) => (b.time < a.time ? 1 : -1))
                    .filter((todo) => todo.date === clickedDay)
                    .map((todo) => (
                        <div className='todo' key={todo._id}>
                            <div
                                className={`${
                                    todo.done === true ? 'reminder' : ''
                                }`}
                            >
                                <div
                                    className='todo-click-box'
                                    onClick={() => {
                                        editTodo(todo);
                                    }}
                                >
                                    {todo.text}
                                    {'  '}
                                    <span className='todo-time_date'>
                                        {todo.time}
                                    </span>
                                    <span className='todo-time_date'>
                                        {todo.date}
                                    </span>
                                </div>
                                <div>
                                    <BiCheck
                                        style={{
                                            color: '#777777',
                                            cursor: 'pointer',
                                            fontSize: '1.1rem',
                                        }}
                                        onClick={() =>
                                            onToggle({
                                                id: todo._id,
                                                done: todo.done,
                                            })
                                        }
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
                    ))}
            </article>
        );
    }
}

export default Today;
