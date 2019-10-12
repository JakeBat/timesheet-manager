import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Table from './spreadsheet/table/Table'
Amplify.configure(awsconfig);
function App() {
  Auth.currentSession().then((data) => console.log(data.getAccessToken().getJwtToken()))
  return (
    <div className="App">
      <Table/>
    </div>
  );
}

export default withAuthenticator(App, true);