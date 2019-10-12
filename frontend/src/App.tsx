import React from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import { get } from './http-client';

Amplify.configure(awsconfig);
function App() {

  Auth.currentSession().then((data) => console.log(data.getAccessToken().getJwtToken()))
  return (
    <div className="App">
      <header className="App-header">
        <img src={''} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);