import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './App.css';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { Column, DataRow } from "./model/table-model";
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table from './spreadsheet/table/Table'
import { TimesheetButtons } from './timesheet-button';
import { Summary } from './summary';
Amplify.configure(awsconfig);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const emptyTimesheet = {userId:'', date:'2019-03-20', timesheetEntries:[]}
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

  return (
    <div className="App">
      <Table data={data} columns={columns}/>
      <TimesheetButtons openSummary={()=> setIsOpen(true)}/>
      <ReactModal isOpen={isOpen}>
        <Summary closeModal={() => setIsOpen(false)} timesheet={emptyTimesheet}/>
      </ReactModal>
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