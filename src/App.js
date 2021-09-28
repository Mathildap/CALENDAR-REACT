import moment from 'moment';
import { useState, useEffect } from 'react';
import './css/style.css';
import AllTodos from './components/AllTodos';
import Calendar from './components/Calendar';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import Today from './components/Today';
import Login from './components/Login';
import Notes from './components/Notes';
import NewNote from './components/NewNote';
import Edit from './components/Edit';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
    // - - - - -  - -  LOGIN / USER - - - -  - - - //
    let [user, setUser] = useState('');
    let [errorMsg, setErrorMsg] = useState();

    // USER
    const userInfo = (info) => {
        fetch('https://calendar-backend-mathildap.herokuapp.com/users', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ info }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                if (jsonRes === 'error') {
                    setErrorMsg('error');
                    return;
                }
                setUser({ userName: jsonRes.username, id: jsonRes.id });
            });
    };

    // NEW USER
    const newUserInfo = (newUser) => {
        fetch('https://calendar-backend-mathildap.herokuapp.com/users/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ newUser }),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setUser({ userName: jsonRes.username, id: jsonRes.id });
            });
    };

    // - - - - -  - -  GET / CHANGE MONTH - - - -  - - - //
    let [monthInNr, setMonthInNr] = useState(moment().format('MM-YYYY'));

    // CHANGE MONTH
    const changeMonth = (changeMonth) => {
        if (changeMonth === 'back') {
            let newMonth = minusMonth(monthInNr);
            setMonthInNr(newMonth);
        } else if (changeMonth === 'forward') {
            let newMonth = plusMonth(monthInNr);
            setMonthInNr(newMonth);
        }
    };

    let minusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MM-YYYY')
            .add(-1, 'month')
            .format('MM-YYYY');
        let monthNr = moment(monthInNr, 'MM-YYYY')
            .add(-1, 'month')
            .format('MM-YYYY');
        setMonthInNr(monthNr);
        return monthDate;
    };

    let plusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MM-YYYY')
            .add(1, 'month')
            .format('MM-YYYY');
        let monthNr = moment(monthInNr, 'MM-YYYY')
            .add(1, 'month')
            .format('MM-YYYY');
        setMonthInNr(monthNr);
        return monthDate;
    };

    // - - - - -  - -  FETCH HOLIDAY API - - - -  - - - //
    let [apiYear, setApiYear] = useState(monthInNr.slice(-4));
    let [api, setApi] = useState([]);
    let HOLIDAY_API = '';
    let useMonth;

    useEffect(() => {
        useMonth = monthInNr.slice(0, 2);
        setApiYear(monthInNr.slice(-4));
        HOLIDAY_API +=
            'https://sholiday.faboul.se/dagar/v2.1/' + apiYear + '/' + useMonth;
        fetch(HOLIDAY_API)
            .then((resp) => resp.json())
            .then((data) => {
                setApi(data.dagar);
            });
    }, [monthInNr]);

    // - - - - -  - -  GET / CHANGE DAYS - - - -  - - - //
    let [days, setDays] = useState([]);
    let [emptyDays, setEmptyDays] = useState(moment());

    // GET DAYS BY MONTH
    const getDaysArrayByMonth = () => {
        const currentMonthDates = Array.from(
            { length: moment(monthInNr, 'MM').daysInMonth() },
            (x, i) =>
                moment(monthInNr, 'MM')
                    .startOf('month')
                    .add(i, 'days')
                    .format('DD')
        );
        setDays(currentMonthDates);
    };

    // GET WHICH DAY THE MONTH BEGINS
    const getEmptyDays = () => {
        let firstDay = moment(monthInNr, 'MM')
            .startOf('month')
            .add(-1, 'days')
            .format('d');
        setEmptyDays(firstDay);
    };

    // UPDATE IF MONTH CHANGES
    useEffect(() => {
        getDaysArrayByMonth();
        getEmptyDays();
        // eslint-disabke.next-line react-hooks/exhaustive-deps
    }, [monthInNr]);

    // - - - - -  - -  CHOOSED DAY - - - -  - - - //
    let [clickedDay, setClickedDay] = useState(moment().format('DD-MM-YYYY'));
    let [newTodoDay, setNewTodoDay] = useState(moment().format('DD-MM-YYYY'));

    // SET CLICKED DAY
    const choosedDay = (answer) => {
        setNewTodoDay(answer.id);
        setClickedDay(answer.id);
    };

    // - - - - -  - -  TODOS - - - -  - - - //
    let [todos, setTodos] = useState();

    // POST NEW TODO TO DB
    const sendTodo = (todo) => {
        let saveTodo = {
            userId: user.id,
            text: todo.text,
            time: todo.time,
            date: newTodoDay,
            done: false,
        };

        fetch('https://calendar-backend-mathildap.herokuapp.com/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(saveTodo),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => setTodos(jsonRes));
    };

    // GET TODOS FROM DB
    useEffect(() => {
        let userId = user.id;

        fetch('https://calendar-backend-mathildap.herokuapp.com/get', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ userId }),
        })
            .then((res) => res.json())
            .then((jsonRes) => setTodos(jsonRes));
    }, [user]);

    // DELETE TODO
    const deleteTask = (id) => {
        let todoId = { id: id, userId: user.id };
        fetch('https://calendar-backend-mathildap.herokuapp.com/delete', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(todoId),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setTodos(jsonRes);
            });
    };

    // TOGGLE DONE
    const toggleReminder = (id) => {
        let trueOrFalse;

        if (id.done === true) {
            trueOrFalse = false;
        } else {
            trueOrFalse = true;
        }

        let todoId = { id: id.id, done: trueOrFalse, userId: user.id };

        fetch('https://calendar-backend-mathildap.herokuapp.com/update', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(todoId),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setTodos(jsonRes);
            });
    };

    // EDIT TODO
    let [todoEdit, setTodoEdit] = useState('');

    const editTodo = (todo) => {
        setTodoEdit(todo);
    };

    const updatedTodo = (info) => {
        console.log(info);

        fetch('https://calendar-backend-mathildap.herokuapp.com/edit', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(info),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setTodos(jsonRes);
                setTodoEdit('');
            });
    };

    // - - - - -  - -  NOTES - - - -  - - - //
    let [notes, setNotes] = useState();

    // NEW NOTE
    const newNote = (note) => {
        let saveNote = {
            userId: user.id,
            note: note,
            done: false,
        };

        fetch(
            'https://calendar-backend-mathildap.herokuapp.com/notes/newNote',
            {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(saveNote),
            }
        )
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setNotes(jsonRes);
            });
    };

    // GET NOTES FROM DB
    useEffect(() => {
        let userId = user.id;

        fetch('https://calendar-backend-mathildap.herokuapp.com/notes/get', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ userId }),
        })
            .then((res) => res.json())
            .then((jsonRes) => setNotes(jsonRes));
    }, [user]);

    // DELETE NOTE
    const deleteNote = (id) => {
        let noteId = { id: id, userId: user.id };

        fetch('https://calendar-backend-mathildap.herokuapp.com/notes/delete', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(noteId),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setNotes(jsonRes);
            });
    };

    return (
        <main>
            {user === '' ? (
                <Login
                    userInfo={userInfo}
                    newUserInfo={newUserInfo}
                    errorMsg={errorMsg}
                />
            ) : (
                <>
                    <Header
                        month={monthInNr}
                        changeMonth={changeMonth}
                        user={user.userName}
                        logOutHandler={() => {
                            setUser('');
                        }}
                    />
                    <section className='main-container'>
                        <Calendar
                            monthInNr={monthInNr}
                            days={days}
                            api={api}
                            firstDayOfMonth={emptyDays}
                            clickedDay={choosedDay}
                            todos={todos}
                            onDelete={deleteTask}
                            onToggle={toggleReminder}
                        />
                        <aside>
                            <div className='aside-container'>
                                <Today
                                    clickedDay={clickedDay}
                                    todos={todos}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                    editTodo={editTodo}
                                />
                                <NewTodo
                                    clickedDay={clickedDay}
                                    inputToDo={sendTodo}
                                />
                            </div>
                            <div className='aside-container'>
                                <Notes notes={notes} onDelete={deleteNote} />
                                <NewNote newNote={newNote} />
                            </div>
                            <AllTodos
                                todos={todos}
                                onDelete={deleteTask}
                                onToggle={toggleReminder}
                            />
                        </aside>
                    </section>
                    {todoEdit === '' ? (
                        ''
                    ) : (
                        <Edit
                            todo={todoEdit}
                            updatedTodo={updatedTodo}
                            closeEdit={() => setTodoEdit('')}
                        />
                    )}
                </>
            )}
        </main>
    );
}

export default App;
