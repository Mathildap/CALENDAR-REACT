import moment from 'moment';
import { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Header from './components/Header';
import NewTodo from './components/NewTodo';
import Today from './components/Today';

const HOLIDAY_API = 'https://svenskahelgdagar.info/v2/GET /year/{2021}';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
    // fetch(HOLIDAY_API)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         console.log(data);
    //     });

    // - - - - -  - -  GET / CHANGE MONTH - - - -  - - - //
    let currentMonth = moment().format('MMMM YYYY');
    let [month, setMonth] = useState(currentMonth);
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
        return monthDate;
    };

    let plusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MMMM YYYY')
            .add(1, 'month')
            .format('MMMM YYYY');
        return monthDate;
    };

    // - - - - -  - -  GET / CHANGE DAYS - - - -  - - - //
    let [days, setDays] = useState([]);
    let [emptyDays, setEmptyDays] = useState(moment());

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

    const getEmptyDays = () => {
        let firstDay = moment(month, 'MMMM')
            .startOf('month')
            .add(-1, 'days')
            .format('d');
        setEmptyDays(firstDay);
    };

    useEffect(() => {
        getDaysArrayByMonth();
        getEmptyDays();
    }, [month]);

    useEffect(() => {
        if (month === moment().format('MMMM YYYY')) {
            const timer = setTimeout(() => {
                let findId = moment().format('MMMM YYYY DD');
                let element = document.getElementById(findId);
                element.classList.add('currentday');
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [month]);

    // - - - - -  - -  CHOOSED DAY - - - -  - - - //
    let today = moment().format('DD MMMM');
    let [clickedDay, setClickedDay] = useState(today);
    let [newTodoDay, setNewTodoDay] = useState(moment().format('DD-MM-YYYY'));

    const choosedDay = (answer) => {
        let formatDate = moment(month, 'MMMM').format('MM');
        setNewTodoDay(answer.date + '-' + formatDate + '-' + answer.year);
        setClickedDay(answer.date + ' ' + answer.mon);
    };

    // - - - - -  - -  NEW TODO - - - -  - - - //
    let [inputText, setInputText] = useState([]);

    const inputToDo = (todo) => {
        let saveTodo = {
            text: todo.text,
            time: todo.time,
            date: newTodoDay,
        };
        setInputText(saveTodo);
    };

    useEffect(() => {
        console.log(inputText);
    }, [inputText]);

    return (
        <main>
            <Header month={month} changeMonth={changeMonth} />
            <section className='main-container'>
                <Calendar
                    month={month}
                    days={days}
                    firstDayOfMonth={emptyDays}
                    clickedDay={choosedDay}
                />
                <aside>
                    <Today clickedDay={clickedDay} />
                    <NewTodo clickedDay={clickedDay} inputToDo={inputToDo} />
                </aside>
            </section>
        </main>
    );
}

export default App;
