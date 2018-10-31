import React, { Component } from 'react';


class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        newRoom: '',
        activeRoom: '',
      };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
   };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
  }

  handleChange(e) {
    this.setState({newRoom: e.target.value});
  }

  createRoom(e) {
    e.preventDefault();
    const newRoom = this.state.newRoom;
    //const roomArray = this.state.rooms;
    this.roomsRef.push({
      name: newRoom
    });
    this.setState({ rooms: this.state.rooms.concat({ name: newRoom }) });
    this.setState({ newRoom: ""  });
  }

  deleteRoom() {

    const roomKey = this.props.activeRoomKey;

    const roomToRemove = this.props.firebase.database().ref( 'rooms/' + roomKey );

    roomToRemove.remove()
    .then(function() {
        console.log("Removed from Firebase, Key: " + roomKey )
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });

      this.setState({ rooms: [...this.state.rooms.filter(room => room.key !== roomKey)] });

  }

  render() {

    const newRoom = this.state.newRoom;

    return(
      <div id="roomList">
        <ul>
          { this.state.rooms.map( ( room, index ) =>
          <li key={index}>
            <span id="room-item-text" onClick={(e) => this.props.handleRoomClick(room)}>
              { room.name }
            </span>
            <button
              type="submit"
              value="Delete Room"
              onClick={ this.deleteRoom }>
              Delete Room
            </button>
        </li>
          )}
        </ul>

        <form onSubmit={ this.createRoom } id="create-room">
          <input
            typle="text"
            default="Room Name"
            value={ newRoom }
            onChange={ this.handleChange }
          >
          </input>
          <button type="submit" value="Add Room">Add Room</button>
        </form>



      </div>

    )}
  }

export default RoomList;
