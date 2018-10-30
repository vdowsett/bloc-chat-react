import React, { Component } from 'react';


class MessageList extends Component {

 constructor(props) {
   super(props);

   this.state = {
     messages: [],
     newMessage: '',
     newMessageUser: '',
     newMessageTime: '',
     newMessageRoom: '',
     };

     this.messagesRef = this.props.firebase.database().ref('messages');
     this.handleChange = this.handleChange.bind(this);
     this.createMessage = this.createMessage.bind(this);

  };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  createMessage(e) {
    e.preventDefault();
    const newMessage = this.state.newMessage;
    const newMessageRoom = this.props.activeRoomKey;
    const newMessageTime = Date.now();
    const newMessageUser = this.props.user.displayName;
    //const roomArray = this.state.rooms;
    this.messagesRef.push({
      content: newMessage,
      username: newMessageUser,
      sentAt: newMessageTime,
      roomId: newMessageRoom,
    });
    this.setState({
      messages: this.state.messages.concat({
        content: newMessage,
        username: newMessageUser,
        sentAt: newMessageTime,
        roomId: newMessageRoom
      })
    });
  }

 render() {

   const newMessage = this.state.newMessage;

   return(

     <div id="list-of-messages" onLoad={ this.setDisplayTime }>

     <h1> {this.props.activeRoom} </h1>
     {
       <ul> {this.state.messages.map( (message, key ) =>  (this.props.activeRoomKey === message.roomId) ?
       <li key={key}>"{message.content}"
         <br/> <b>{message.username}</b>, { message.sentAt }, {message.roomId}</li>
       : ""
     )}
      </ul>
      }

      <form onSubmit={ this.createMessage } id="create-message">
        <input
          typle="textarea"
          default="Message Here"
          value={ newMessage }
          onChange={ this.handleChange }
        >
        </input>
        <button type="submt" value="Add Message">Add Message</button>
      </form>

   </div>

   )}
 }
export default MessageList;
