import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5zvN0EXhIUisEdms6SYLDzvUAogX9h-0",
    authDomain: "bloc-chat-react-de285.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-de285.firebaseio.com",
    projectId: "bloc-chat-react-de285",
    storageBucket: "bloc-chat-react-de285.appspot.com",
    messagingSenderId: "196906533860"
  };
  firebase.initializeApp(config);


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>

        <div>
          <section id="sidebar">
            <h1>Chat App</h1>
              <RoomList firebase={firebase}/>
          </section>
          <section id="mainBody"></section>

        </div>
      </div>
    );
  }
}

export default App;
