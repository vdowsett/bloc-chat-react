import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


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
    };

    this.roomsRef = firebase.database().ref('rooms');
    this.handleRoomClick = this.handleRoomClick.bind(this);
  };

  componentDidMount() {
    //set default room name and key
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({activeRoom: room.name});
       this.setState({activeRoomKey: room.key});
       console.log("name: " + room.name + ", key: " + room.key);

       console.log("Active Room Name:" + this.state.activeRoom)
       console.log("Active Room Key:" + this.state.activeRoomKey)
     });
  }

  handleRoomClick = (room) => {
    this.setState({activeRoom: room.name});
    this.setState({activeRoomKey: room.key});
    console.log("Active Room Name:" + this.state.activeRoom)
    console.log("Active Room Key:" + this.state.activeRoomKey)
   }

  render() {

    console.log(this.state.activeRoom);

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
          />

      </div>
    );
  }
}

export default App;
