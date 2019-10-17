import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerContainer.css'

export const DatePickerContainer = ({date, isDatePickerOpen, changeDate, toggleDatePicker}) => {
    return (
        <div className='date-picker'>
            <i className="material-icons left-icon"
               onClick={() => changeDate(new Date(date.setDate(date.getDate() - 1)))}
            >
                chevron_left
            </i>
            <span className='date'>{date.toDateString()}</span>
            <i className="material-icons right-icon"
               onClick={() => changeDate(new Date(date.setDate(date.getDate() + 1)))}
            >
                chevron_right
            </i>
            <i className="material-icons right-icon"
               onClick={(event) => {
                   event.stopPropagation();
                   toggleDatePicker(!isDatePickerOpen)
               }}
            >
                calendar_today
            </i>
            {isDatePickerOpen &&
            <div className='calendar'>
                <DatePicker inline selected={date} onChange={changeDate}/>
            </div>
            }
        </div>
    )
};