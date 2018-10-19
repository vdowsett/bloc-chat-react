import React, { Component } from 'react';


class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        newRoom: '',
      };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);

   };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
       console.log("name: " + room.name + ", key: " + room.key);
     });
  }

  handleChange(e) {
    this.setState({newRoom: e.target.value});
  }

  createRoom(e) {
    e.preventDefault();
    const newRoom = this.state.newRoom;
    const roomArray = this.state.rooms;
    this.setState({ rooms: this.state.rooms.concat({ name: newRoom }) })
    console.log(this.state.rooms);
  }

  render() {

    const newRoom = this.state.newRoom;

    return(
      <div id="roomList">
        <ul>
          { this.state.rooms.map( ( room, index ) =>
          <li key={index}> { room.name } </li>
          )}
        </ul>

        <form onSubmit={ this.createRoom } >
          <input
            typle="text"
            default="Room Name"
            value={ newRoom }
            onChange={ this.handleChange }
          >
          </input>
          <button type="submt" value="Add Room">Add Room</button>
        </form>
      </div>

    )}
  }

export default RoomList;
