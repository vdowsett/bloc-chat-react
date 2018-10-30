import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
  constructor(props) {
    super(props);

  this.state = {
    activeRoom: "",
    activeRoomKey: null,
    user: null,
    };

    this.roomsRef = firebase.database().ref('rooms');
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.setUser = this.setUser.bind(this);

  };

  componentDidMount() {
    //set default room name and key
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({activeRoom: room.name});
       this.setState({activeRoomKey: room.key});
     });
  }

  handleRoomClick = (room) => {
    this.setState({activeRoom: room.name});
    this.setState({activeRoomKey: room.key});
   }

  setUser(user) {
    this.setState({ user : user });
  }

  render() {

    return (
      <div className="App">

          <RoomList onLoad={this.setActiveRoom}
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            handleRoomClick={this.handleRoomClick}
          />

          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomKey={this.state.activeRoomKey}
            user={this.state.user}
          />

          <User
            firebase={firebase}
            setUser={this.setUser}
            user={this.state.user}
          />

      </div>
    );
  }
}

export default App;
