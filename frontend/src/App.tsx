import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {Provider} from 'react-redux';
import store from './redux/store'
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table from './spreadsheet/table/Table'
import {TimesheetButtons} from './timesheet-button';
import {Summary} from './summary';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
import {Column} from './model/table-model';
import {convertToTimeSpent, formatDate} from "./shared/utils";
import {get, post} from './shared';

Amplify.configure(awsconfig);

function App() {

    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() === 1 ? 3 : 1))));
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const columns: Column[] = [
        {title: 'Company', input: 'select', valueKey: 'company'},
        {title: 'Start Time', input: 'text', valueKey: 'startTime'},
        {title: 'End Time', input: 'text', valueKey: 'endTime'},
        {title: 'Issue', input: 'text', valueKey: 'issue'},
        {title: 'Comment', input: 'text', valueKey: 'comment'},
        {title: 'Time Spent', input: 'none', valueKey: 'timeSpent'},
        {title: 'Issue Total', input: 'none', valueKey: 'issueTotal'},
        {title: 'Day Total', input: 'none', valueKey: 'dayTotal'}
    ];
    const [timesheet, setTimesheet] = useState({userId: '', date: '', timesheetEntries: []});

    useEffect(() => {
        get(`?date=${formatDate(date)}`).then((timesheet) => {
            timesheet = makeTimesheetEntriesBig(timesheet);
            timesheet.timesheetEntries = timesheet.timesheetEntries.map(entry => ({
                ...entry,
                get timeSpent() {
                    return (this.startTime != '' && this.endTime != '') ? convertToTimeSpent(this.startTime, this.endTime) : '';
                }
            }));
            setTimesheet(timesheet);
        })
    }, [date]);
    return (
        <Provider store={store}>
            <div className="App" onClick={() => setDatePickerOpen(false)}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <i className="material-icons" style={{marginRight: '5px', cursor: 'pointer'}}
                       onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>chevron_left</i>
                    <span style={{fontSize: '24px'}}>{date.toDateString()}</span>
                    <i className="material-icons" style={{marginLeft: '5px', cursor: 'pointer'}}
                       onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>chevron_right</i>
                    <i className="material-icons" style={{marginLeft: '5px', cursor: 'pointer'}} onClick={(event) => {
                        event.stopPropagation();
                        setDatePickerOpen(!isDatePickerOpen)
                    }}>calendar_today</i>
                    {isDatePickerOpen && <div style={{position: 'relative'}}>
                        <DatePicker inline selected={date} onChange={setDate}/>
                    </div>}
                </div>
                {console.log(timesheet.timesheetEntries)}
                <Table data={timesheet.timesheetEntries} columns={columns}
                       onDataChange={timesheetEntries => setTimesheet({...timesheet, timesheetEntries})}/>
                <TimesheetButtons addRow={() => {
                    post("", addEmptyRow(timesheet)).then(() => {
                        setTimesheet({...timesheet})
                    })
                }} postTime={() => {
                    timesheet.timesheetEntries = timesheet.timesheetEntries.filter(entry => entry.endTime);
                    post("", timesheet).then(() => {
                    setTimesheet({...makeTimesheetEntriesBig(timesheet)})
                })}} openSummary={() => setIsOpen(true)}/>
                <ReactModal isOpen={isOpen}>
                    <Summary closeModal={() => setIsOpen(false)} timesheet={timesheet}/>
                </ReactModal>
            </div>
        </Provider>
    );
}


function addEmptyRow(timesheet) {
    timesheet.timesheetEntries.push({
        company: 'AV',
        startTime: timesheet.timesheetEntries[0] ? timesheet.timesheetEntries[timesheet.timesheetEntries.length - 1].endTime : null,
        endTime: null,
        issue: null,
        comment: null
    });
    return timesheet;
}

const makeTimesheetEntriesBig = (timesheet) => {
    while(timesheet.timesheetEntries.length < 25) {
        timesheet = addEmptyRow(timesheet)
    }
    return timesheet;
};

const signUpConfig = {
    header: 'Welcome to Timesheet',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
        {
            label: 'Email',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
        }
    ]
};
export default withAuthenticator(App, {includeGreetings: true, signUpConfig});