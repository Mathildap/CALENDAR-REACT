import moment from 'moment';
import { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EmptyDays from './components/EmptyDays';
import Header from './components/Header';

moment.updateLocale('sv', {
    week: {
        dow: 1,
    },
});

function App() {
    // - - - - -  - -  GET / CHANGE MONTH - - - -  - - - //
    let currentMonth = moment().format('MMMM');
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
        let monthDate = moment(cMonth, 'MMMM').add(-1, 'month').format('MMMM');
        return monthDate;
    };

    let plusMonth = (cMonth) => {
        let monthDate = moment(cMonth, 'MMMM').add(1, 'month').format('MMMM');
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

    return (
        <main>
            <Header month={month} changeMonth={changeMonth} />
            <Calendar days={days} firstDayOfMonth={emptyDays} />
        </main>
    );
}

export default App;
