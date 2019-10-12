import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table, {Column, DataRow} from './spreadsheet/table/Table'
Amplify.configure(awsconfig);
function App() {

  const data: DataRow[] = [createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow(), createEmptyDataRow()];
  const columns: Column[] = [];

  Auth.currentSession().then((data) => console.log(data.getAccessToken().getJwtToken()))
  return (
    <div className="App">
      <Table data={data} columns={columns}/>
    </div>
  );
}


function createEmptyDataRow(): DataRow {
  return {startTime: 'st', endTime: 'et', issue: 'is', comment: 'comment', issueTotal: 'ist', timeSpent: 'ts', dayTotal: 'dt'}
}

export default withAuthenticator(App, true);