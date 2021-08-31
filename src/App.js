import moment from 'moment';
import { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Today from './components/Today';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
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

    // - - - - -  - -  CHOOSED DAY - - - -  - - - //
    let today = moment().format('DD MMMM');
    let findId = moment().format('MMMM YYYY DD');
    let [clickedDay, setClickedDay] = useState(today);
    console.log(findId);
    window.onload = function () {
        document.getElementById(findId).classList.add('currentday');
    };

    const choosedDay = (answer) => {
        setClickedDay(answer.date + ' ' + answer.mon);
    };

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
                <Today clickedDay={clickedDay} />
            </section>
        </main>
    );
}

export default App;
