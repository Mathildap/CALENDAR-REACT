import moment from 'moment';
import React from 'react';
import Todo from './Todo';

function AllTodos({ todos, onDelete, onToggle }) {
    if (todos === undefined) {
        return <div>No todos!</div>;
    } else {
        return (
            <div className='aside-container alltodos-container'>
                <h1>All Todos</h1>
                {todos
                    .sort((a, b) =>
                        moment(b.date, 'DD-MM-YYYY') <
                        moment(a.date, 'DD-MM-YYYY')
                            ? 1
                            : -1
                    )
                    .map((todo) => (
                        <Todo
                            key={todo._id}
                            todo={todo}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
            </div>
        );
    }
}

export default AllTodos;
