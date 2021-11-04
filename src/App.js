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
import { auth } from './Firebase/firebase';
import { signOut } from 'firebase/auth';
import WeekLayout from './components/WeekLayout';
import WeekHeader from './components/WeekHeader';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
    // - - - - -  - -  LOGIN / USER - - - -  - - - //
    let [user, setUser] = useState('');
    let [errorMsg, setErrorMsg] = useState();
    let [emailExist, setEmailExist] = useState();

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
                setErrorMsg();
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
                if (jsonRes === 'email exist') {
                    setEmailExist('email exist');
                    return;
                }
                setUser({ userName: jsonRes.username, id: jsonRes.id });
                setEmailExist();
            });
    };

    // GOOGLE LOGIN
    const googleLogin = (info) => {
        fetch(
            'https://calendar-backend-mathildap.herokuapp.com/users/googleLogin',
            {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ info }),
            }
        )
            .then((resp) => resp.json())
            .then((jsonRes) => {
                const googleUser = {
                    userName: jsonRes.username,
                    id: jsonRes.id,
                    googleLogin: jsonRes.googleLogin,
                };
                setUser(googleUser);
            })
            .catch((err) => console.log(err));
    };

    // LOG OUT
    const logOutHandler = () => {
        setUser('');
        if (user.googleLogin === true) {
            signOut(auth);
        }
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

    useEffect(() => {
        let HOLIDAY_API = '';
        let useMonth;

        useMonth = monthInNr.slice(0, 2);
        setApiYear(monthInNr.slice(-4));
        HOLIDAY_API +=
            'https://sholiday.faboul.se/dagar/v2.1/' + apiYear + '/' + useMonth;
        fetch(HOLIDAY_API)
            .then((resp) => resp.json())
            .then((data) => {
                setApi(data.dagar);
            })
            .catch((error) => {
                console.log(error);
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
        let firstDay = moment(monthInNr, 'MM-YYYY')
            .startOf('month')
            .add(-1, 'days')
            .format('d');
        setEmptyDays(firstDay);
    };

    // UPDATE IF MONTH CHANGES
    useEffect(() => {
        getDaysArrayByMonth();
        getEmptyDays();
    }, [monthInNr]);

    // - - - - -  - -  CHOOSED DAY - - - -  - - - //
    let [clickedDay, setClickedDay] = useState(moment().format('DD-MM-YYYY'));
    let [newTodoDay, setNewTodoDay] = useState(moment().format('DD-MM-YYYY'));

    // SET CLICKED DAY
    const choosedDay = (answer) => {
        setNewTodoDay(answer.id);
        setClickedDay(answer.id);
    };

    // - - - - -  - -  WEEK LAYOUT - - - -  - - - //
    let [weekLayout, setWeekLayout] = useState(false);
    let [week, setWeek] = useState(moment().format('W YYYY'));
    let [weekDates, setWeekDates] = useState();

    useEffect(() => {
        let startOfWeek = moment(week, 'W YYYY').startOf('isoWeek');
        let endOfWeek = moment(week, 'W YYYY').endOf('isoWeek');

        let dayss = [];
        let day = startOfWeek;
        while (day <= endOfWeek) {
            dayss.push(moment(day).format('DD'));
            day = day.clone().add(1, 'd');
        }
        setWeekDates(dayss);
    }, [week]);

    const weekLayoutHandler = (change) => {
        if (weekLayout) {
            setWeekLayout(!weekLayout);
        } else {
            setWeekLayout(!weekLayout);
        }
    };

    // CHANGE MONTH
    const changeWeek = (changeWeek) => {
        if (changeWeek === 'back') {
            let newWeek = minusWeek(week);
            setWeek(newWeek);
        } else if (changeWeek === 'forward') {
            let newWeek = plusWeek(week);
            setWeek(newWeek);
        }
    };

    let minusWeek = (cWeek) => {
        let newWeek = moment(cWeek, 'W').add(-1, 'week').format('W YYYY');
        setWeek(newWeek);
        return newWeek;
    };

    let plusWeek = (cWeek) => {
        let newWeek = moment(cWeek, 'W').add(1, 'week').format('W YYYY');
        setWeek(newWeek);
        return newWeek;
    };

    // - - - - -  - -  TODOS - - - -  - - - //
    let [todos, setTodos] = useState();

    // POST NEW TODO TO DB
    const sendTodo = (todo) => {
        let saveTodo = {
            userId: user.id,
            text: todo.text,
            time: todo.time,
            timeTo: todo.timeTo,
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
        getUsersTodos();
    }, [user]);

    async function getUsersTodos() {
        let userId = user.id;

        try {
            const res = await fetch(
                'https://calendar-backend-mathildap.herokuapp.com/get',
                {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ userId }),
                }
            ).then((resp) => resp.json());
            setTodos(res);
        } catch (err) {
            console.log(err);
        }
    }

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
                    googleLogin={googleLogin}
                    errorMsg={errorMsg}
                    emailExist={emailExist}
                />
            ) : (
                <>
                    {weekLayout ? (
                        <>
                            <WeekHeader
                                changeWeek={changeWeek}
                                week={week}
                                weekLayoutHandler={weekLayoutHandler}
                                user={user.userName}
                                logOutHandler={logOutHandler}
                            />
                            <section className='main-container'>
                                <WeekLayout
                                    weekDates={weekDates}
                                    todos={todos}
                                    monthInNr={monthInNr}
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
                                        <Notes
                                            notes={notes}
                                            onDelete={deleteNote}
                                        />
                                        <NewNote newNote={newNote} />
                                    </div>
                                    <AllTodos
                                        todos={todos}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                        editTodo={editTodo}
                                    />
                                </aside>
                            </section>
                        </>
                    ) : (
                        <>
                            <Header
                                month={monthInNr}
                                changeMonth={changeMonth}
                                user={user.userName}
                                logOutHandler={logOutHandler}
                                weekLayoutHandler={weekLayoutHandler}
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
                                        <Notes
                                            notes={notes}
                                            onDelete={deleteNote}
                                        />
                                        <NewNote newNote={newNote} />
                                    </div>
                                    <AllTodos
                                        todos={todos}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                        editTodo={editTodo}
                                    />
                                </aside>
                            </section>
                        </>
                    )}
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
