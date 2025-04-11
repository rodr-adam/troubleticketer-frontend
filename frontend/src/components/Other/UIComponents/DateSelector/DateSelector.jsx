import React, { useState, useEffect } from 'react'
import './DateSelector.css'

const DateSelector = ({onDateChange, initialDate}) => {

    /* Array for the string representation of months */

    const months = [
        {name: 'January', value: 1},
        {name: 'February', value: 2},
        {name: 'March', value: 3},
        {name: 'April', value: 4},
        {name: 'May', value: 5},
        {name: 'June' , value: 6},
        {name: 'July', value: 7},
        {name: 'August', value: 8},
        {name: 'September', value: 9},
        {name: 'October', value: 10},
        {name: 'November', value: 11},
        {name: 'December', value: 12}
    ];

    /* Generate the unique number of days for each month*/

    const generateDays = (year, month) => {
        return new Array(new Date(year, month, 0).getDate())
        .fill(null)
        .map((_, index) => index + 1);
    }
    
    const generateYears = (startYear, endYear) => {
        return Array.from({ length: endYear - startYear + 1 }).map((_, index) => startYear +  index);
    }

    const currentYear = new Date().getFullYear();

    const parsedInitialDate = initialDate
      ? new Date(initialDate)
      : new Date(); // fallback to today


    const [selectedMonth, setSelectedMonth] = useState(parsedInitialDate.getMonth() +1);
    const [selectedDay, setSelectedDay] = useState(parsedInitialDate.getDate());
    const [selectedYear, setSelectedYear] = useState(parsedInitialDate.getFullYear());

    const daysInMonth = generateDays(selectedYear, selectedMonth);
    const years = generateYears(currentYear - 10 , currentYear + 5);

    const handleDateChange = (newMonth, newDay, newYear) => {
        
        onDateChange({month: newMonth, day: newDay, year: newYear})
    }

    useEffect(() => {
      const formatted = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      onDateChange(formatted); // Send formatted date to parent
    }, [selectedMonth, selectedDay, selectedYear, onDateChange]);
  
  return (
    <div className="date-selector">
      {/* Month Selector */}
      <select className='date-selector-input'
        value={selectedMonth}
        onChange={(e) => {
          const newMonth = parseInt(e.target.value, 10);
          setSelectedMonth(newMonth);
          handleDateChange(newMonth, selectedDay, selectedYear);
        }}
      >
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.name}
          </option>
        ))}
      </select>

      {/* Day Selector */}
      <select className='date-selector-input'
        value={selectedDay}
        onChange={(e) => {
          const newDay = parseInt(e.target.value, 10);
          setSelectedDay(newDay);
          handleDateChange(selectedMonth, newDay, selectedYear);
        }}
      >
        {daysInMonth.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      {/* Year Selector */}
      <select className='date-selector-input'
        value={selectedYear}
        onChange={(e) => {
          const newYear = parseInt(e.target.value, 10);
          setSelectedYear(newYear);
          handleDateChange(selectedMonth, selectedDay, newYear);
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DateSelector
