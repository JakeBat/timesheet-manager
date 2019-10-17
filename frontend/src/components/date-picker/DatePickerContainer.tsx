import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePickerContainer.css'

export const DatePickerContainer = ({date, isDatePickerOpen, changeDate, toggleDatePicker}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <i className="material-icons" style={{marginRight: '5px', cursor: 'pointer'}}
               onClick={() => changeDate(new Date(date.setDate(date.getDate() - 1)))}>chevron_left</i>
            <span style={{fontSize: '24px'}}>{date.toDateString()}</span>
            <i className="material-icons" style={{marginLeft: '5px', cursor: 'pointer'}}
               onClick={() => changeDate(new Date(date.setDate(date.getDate() + 1)))}>chevron_right</i>
            <i className="material-icons" style={{marginLeft: '5px', cursor: 'pointer'}} onClick={(event) => {
                event.stopPropagation();
                toggleDatePicker(!isDatePickerOpen)
            }}>calendar_today</i>
            {isDatePickerOpen && <div style={{position: 'relative'}}>
                // @ts-ignore
                <DatePicker inline selected={date} onChange={changeDate}/>
            </div>}
        </div>
    )
};