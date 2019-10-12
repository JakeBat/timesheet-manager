import React from 'react';
import './App.css';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table from './spreadsheet/table/Table'
import {Column, DataRow} from "./model/table-model";

Amplify.configure(awsconfig);

function App() {

    const data: DataRow[] = [createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow()];
    const columns: Column[] = [
        {title: 'Start Time', isEditable: true},
        {title: 'End Time', isEditable: true},
        {title: 'Issue', isEditable: true},
        {title: 'Comment', isEditable: true},
        {title: 'Time Spent', isEditable: false},
        {title: 'Issue Total', isEditable: false},
        {title: 'Day Total', isEditable: false}
        ];

    Auth.currentSession().then((data) => console.log(data.getAccessToken().getJwtToken()))
    return (
        <div className="App">
            <Table data={data} columns={columns}/>
        </div>
    );
}


function createEmptyDataRow(): DataRow {
    return {
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