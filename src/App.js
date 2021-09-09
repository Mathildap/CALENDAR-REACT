import moment from 'moment';
import { useState, useEffect } from 'react';
import './css/style.css';
import AllTodos from './components/AllTodos';
import Calendar from './components/Calendar';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import Today from './components/Today';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
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
    let [savedTodo, setSavedTodo] = useState();

    // POST NEW TODO TO DB
    const sendTodo = (todo) => {
        let saveTodo = {
            text: todo.text,
            time: todo.time,
            date: newTodoDay,
            done: false,
        };

        setSavedTodo(saveTodo);

        fetch('https://calendar-frontend-mathildap.herokuapp.com/new', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(saveTodo),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => setTodos(jsonRes));
    };

    // GET TODOS FROM DB
    useEffect(() => {
        fetch('https://calendar-frontend-mathildap.herokuapp.com/get')
            .then((res) => res.json())
            .then((jsonRes) => setTodos(jsonRes));
    }, []);

    // DELETE TODO
    const deleteTask = (id) => {
        let todoId = { id };
        fetch('https://calendar-frontend-mathildap.herokuapp.com/delete', {
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

        let todoId = { id: id.id, done: trueOrFalse };

        fetch('https://calendar-frontend-mathildap.herokuapp.com/update', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(todoId),
        })
            .then((resp) => resp.json())
            .then((jsonRes) => {
                setTodos(jsonRes);
            });
    };

    return (
        <main>
            <Header month={monthInNr} changeMonth={changeMonth} />
            <section className='main-container'>
                <Calendar
                    monthInNr={monthInNr}
                    days={days}
                    api={api}
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
