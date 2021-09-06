import moment from 'moment';
import { useState, useEffect } from 'react';
import './css/style.css';
import AllTodos from './components/AllTodos';
import Calendar from './components/Calendar';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import Today from './components/Today';

// const HOLIDAY_API = 'https://svenskahelgdagar.info/v2/GET /year/{2021}';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
    // - - - - -  - -  GET / CHANGE MONTH - - - -  - - - //
    let currentMonth = moment().format('MMMM YYYY');
    let [month, setMonth] = useState(currentMonth);
    let [monthInNr, setMonthInNr] = useState(
        moment(month, 'MMMM').format('MM-YYYY')
    );

    // CHANGE MONTH
    const changeMonth = (changeMonth) => {
        if (changeMonth === 'back') {
            let newMonth = minusMonth(month);
            setMonth(newMonth);
        } else if (changeMonth === 'forward') {
            let newMonth = plusMonth(month);
            setMonth(newMonth);
        }
    };

    let minusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MMMM YYYY')
            .add(-1, 'month')
            .format('MMMM YYYY');
        let monthNr = moment(month, 'MMMM YYYY')
            .add(-1, 'month')
            .format('MM-YYYY');
        setMonthInNr(monthNr);
        return monthDate;
    };

    let plusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MMMM YYYY')
            .add(1, 'month')
            .format('MMMM YYYY');
        let monthNr = moment(month, 'MMMM YYYY')
            .add(1, 'month')
            .format('MM-YYYY');
        setMonthInNr(monthNr);
        return monthDate;
    };

    // - - - - -  - -  GET / CHANGE DAYS - - - -  - - - //
    let [days, setDays] = useState([]);
    let [emptyDays, setEmptyDays] = useState(moment());

    // GET DAYS BY MONTH
    const getDaysArrayByMonth = () => {
        const currentMonthDates = Array.from(
            { length: moment(month, 'MMMM').daysInMonth() },
            (x, i) =>
                moment(month, 'MMMM')
                    .startOf('month')
                    .add(i, 'days')
                    .format('DD')
        );
        setDays(currentMonthDates);
    };

    // GET WHICH DAY THE MONTH BEGINS
    const getEmptyDays = () => {
        let firstDay = moment(month, 'MMMM')
            .startOf('month')
            .add(-1, 'days')
            .format('d');
        setEmptyDays(firstDay);
    };

    // UPDATE IF MONTH CHANGES
    useEffect(() => {
        getDaysArrayByMonth();
        getEmptyDays();
    }, [month]);

    // - - - - -  - -  CHOOSED DAY - - - -  - - - //
    let today = moment().format('DD-MM-YYYY');
    let [clickedDay, setClickedDay] = useState(today);
    let [newTodoDay, setNewTodoDay] = useState(moment().format('DD-MM-YYYY'));

    // COLOR TODAYS CONTAINER
    useEffect(() => {
        if (month === moment().format('MMMM YYYY')) {
            const timer = setTimeout(() => {
                let findId = moment().format('DD-MM-YYYY');
                let element = document.getElementById(findId);
                element.classList.add('currentday');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [month]);

    // SET CLICKED DAY
    const choosedDay = (answer) => {
        setNewTodoDay(answer.id);
        setClickedDay(answer.id);
    };

    // - - - - -  - -  TODOs - - - -  - - - //
    let [todos, setTodos] = useState();
    let [savedTodo, setSavedTodo] = useState();

    // POST NEW TODO TO DB
    const sendTodo = (todo) => {
        let saveTodo = {
            text: todo.text,
            time: todo.time,
            date: newTodoDay,
        };

        setSavedTodo(saveTodo);

        fetch('http://localhost:3001/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(saveTodo),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {});
    };

    // GET TODOS FROM DB
    useEffect(() => {
        fetch('http://localhost:3001/get')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })

            .then((jsonRes) => setTodos(jsonRes));
    }, [savedTodo]);

    // - - - - -  - -  ALL TODOs - - - -  - - - //
    // DELETE TASK
    const deleteTask = (id) => {
        let todoId = { id };
        fetch('http://localhost:3001/delete', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(todoId),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setTodos(jsonRes);
            });
    };

    // TOGGLE REMINDER
    const toggleReminder = (id) => {
        setTodos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, reminder: !todo.reminder } : todo
            )
        );
    };

    return (
        <main>
            <Header month={month} changeMonth={changeMonth} />
            <section className='main-container'>
                <Calendar
                    month={month}
                    monthInNr={monthInNr}
                    days={days}
                    firstDayOfMonth={emptyDays}
                    clickedDay={choosedDay}
                    todos={todos}
                />
                <aside>
                    <div className='aside-container'>
                        <Today
                            clickedDay={clickedDay}
                            todos={todos}
                            onDelete={deleteTask}
                            onToggle={toggleReminder}
                        />
                        <NewTodo clickedDay={clickedDay} inputToDo={sendTodo} />
                    </div>
                    <AllTodos
                        todos={todos}
                        onDelete={deleteTask}
                        onToggle={toggleReminder}
                    />
                </aside>
            </section>
        </main>
    );
}

export default App;

// TODO
