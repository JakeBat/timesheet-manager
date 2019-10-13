import React, {useState} from 'react';
// @ts-ignore
import ReactModal from 'react-modal';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table from './spreadsheet/table/Table'
import {TimesheetButtons} from './timesheet-button';
import {Summary} from './summary';
// @ts-ignore
import {Column, DataRow} from './model/table-model';

Amplify.configure(awsconfig);

function App() {
    const [isOpen, setIsOpen] = useState(false);
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
        <div className="App">
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
        company: "TA",
        startTime: 'st',
        endTime: 'et',
        issue: 'is',
        comment: 'comment',
        issueTotal: 'ist',
        timeSpent: 'ts',
        dayTotal: 'dt'
    }
}

export default withAuthenticator(App, true);