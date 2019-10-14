import React, {useState} from 'react';
import ReactModal from 'react-modal';
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
import {Column, DataRow} from './model/table-model';
import {convertToTimeSpent} from "./shared/utils";

Amplify.configure(awsconfig);

function App() {

    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const emptyTimesheet = {userId: '', date: '2019-03-20', timesheetEntries: []};
    const data: DataRow[] = [createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow()];
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

    return (
        <div className="App" onClick={() => setDatePickerOpen(false)}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <i className="material-icons" style={{marginRight:'5px', cursor:'pointer'}} onClick={() => setDate(new Date(date.setDate(date.getDate()-1)))}>chevron_left</i>
                <span style={{fontSize:'24px'}}>{date.toDateString()}</span>
                <i className="material-icons" style={{marginLeft:'5px', cursor:'pointer'}} onClick={() => setDate(new Date(date.setDate(date.getDate()-1)))}>chevron_right</i>
                <i className="material-icons" style={{marginLeft:'5px', cursor:'pointer'}} onClick={(event) => {
                    event.stopPropagation();
                    setDatePickerOpen(!isDatePickerOpen)
                }}>calendar_today</i>
                {isDatePickerOpen && <div style={{position:'relative'}}>
                    <DatePicker inline selected={date} onChange={setDate}/>
                </div>}
            </div>

            <Table data={data} columns={columns}/>
            <TimesheetButtons openSummary={() => setIsOpen(true)}/>
            <ReactModal isOpen={isOpen}>
                <Summary closeModal={() => setIsOpen(false)} timesheet={emptyTimesheet}/>
            </ReactModal>
        </div>
    );
}


function createEmptyDataRow(): DataRow {
    return {
        company: 'AV',
        startTime: '',
        endTime: '',
        issue: '',
        comment: '',
        get timeSpent() {
            return (this.startTime != '' && this.endTime != '') ? convertToTimeSpent(this.startTime, this.endTime) : '';
        },
    }
}

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
}
export default withAuthenticator(App, {includeGreetings: true, signUpConfig});