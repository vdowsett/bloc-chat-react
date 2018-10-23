import React, { Component } from 'react';


class MessageList extends Component {

 constructor(props) {
   super(props);

   this.state = {
     messages: [],
     newMessage: "",
     };

     this.roomsRef = this.props.firebase.database().ref('messages');

  };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
  }


 render() {

   return(
     <div id="list-of-messages">

     <h1> {this.props.activeRoom} </h1>
     {
       <ul> {this.state.messages.map( (message, key ) =>  (this.props.activeRoomKey === message.roomId) ?
       <li key={key}><b>{message.username}</b>,<i>"{message.content}"</i> , {message.timeAt}, {message.roomId}</li>
       : ""
     )}
      </ul>
      }

   </div>

   )}
 }
export default MessageList;
