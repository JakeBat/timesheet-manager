import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import "react-datepicker/dist/react-datepicker.css";
import Table from './components/shared/table/Table'
import {TimesheetButtons} from './components/timesheet-button';
import {convertToTimeSpent, formatDate} from "./utils";
import {get, post} from './http-client';
import {DatePickerContainer} from "./components/date-picker/DatePickerContainer";
import {signUpConfig, timesheetColumns} from "./variables";
import {Summary} from "./components/summary/Summary";

Amplify.configure(awsconfig);

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() === 1 ? 3 : 1))));
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [timesheet, setTimesheet] = useState({userId: '', date: '', timesheetEntries: []});


    useEffect(() => {
        getTimesheetData(date, setTimesheet)
    }, [date]);

    return (
        <div className="App" onClick={() => setDatePickerOpen(false)}>
            <DatePickerContainer
                date={date}
                isDatePickerOpen={isDatePickerOpen}
                changeDate={(date) => {
                    setDate(date)
                }}
                toggleDatePicker={(isDatePickerOpen) => {
                    setDatePickerOpen(isDatePickerOpen)
                }}
            />
            <Table
                data={timesheet.timesheetEntries}
                columns={timesheetColumns}
                onDataChange={timesheetEntries => setTimesheet({...timesheet, timesheetEntries})}
            />
            <TimesheetButtons
                addRow={() => {
                    addRow(timesheet, setTimesheet)
                }}
                postTime={() => {
                    save(timesheet, setTimesheet)
                }}
                openSummary={() => setIsOpen(true)}/>
            <ReactModal isOpen={isOpen}>
                <Summary closeModal={() => setIsOpen(false)}
                         timesheet={{
                             ...timesheet,
                             timesheetEntries: timesheet.timesheetEntries ? timesheet.timesheetEntries.filter(entry => entry.endTime) : [],
                         }}
                />
            </ReactModal>
        </div>
    );
};

const addRow = (timesheet, setTimesheet: Function) => {
    timesheet =
        post("", addEmptyRow(timesheet)).then(() => {
            setTimesheet({...timesheet})
        })
};

const save = (timesheet, setTimesheet: Function) => {
    timesheet.timesheetEntries = timesheet.timesheetEntries.filter(entry => entry.endTime);
    post("", timesheet).then(() => {
        setTimesheet({...addEmptyRows(timesheet)})
    });
};

const getTimesheetData = (date, setTimesheet: Function) => {
    get(`?date=${formatDate(date)}`).then((timesheet) => {
        timesheet = addEmptyRows(timesheet);
        timesheet.timesheetEntries = timesheet.timesheetEntries.map(entry => ({
            ...entry,
            get timeSpent() {
                return (this.startTime != '' && this.endTime != '') ? convertToTimeSpent(this.startTime, this.endTime) : '';
            }
        }));
        setTimesheet(timesheet);
    })
};

const addEmptyRow = (timesheet) => {
    timesheet.timesheetEntries.push({
        company: 'AV',
        startTime: timesheet.timesheetEntries[0] ? timesheet.timesheetEntries[timesheet.timesheetEntries.length - 1].endTime : null,
        endTime: null,
        issue: null,
        comment: null
    });
    return timesheet;
};

const addEmptyRows = (timesheet) => {
    while (timesheet.timesheetEntries.length < 30) {
        timesheet = addEmptyRow(timesheet)
    }
    return timesheet;
};

export default withAuthenticator(App, {includeGreetings: true, signUpConfig, usernameAttributes: 'email'});