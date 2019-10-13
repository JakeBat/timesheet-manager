import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table, {Column, DataRow} from './spreadsheet/table/Table'
import { TimesheetButtons } from './timesheet-button';
import { Summary } from './summary';
Amplify.configure(awsconfig);
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const emptyTimesheet = {userId:'', date:'2019-03-20', timesheetEntries:[]}
  const data: DataRow[] = [createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow()];
  const columns: Column[] = [];

  Auth.currentSession().then((data) => console.log(data.getAccessToken().getJwtToken()))
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
  return {startTime: 'st', endTime: 'et', issue: 'is', comment: 'comment', issueTotal: 'ist', timeSpent: 'ts', dayTotal: 'dt'}
}

export default withAuthenticator(App, true);