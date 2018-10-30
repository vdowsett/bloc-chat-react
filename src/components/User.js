import React, { Component } from 'react';


class User extends Component {

  constructor(props) {
    super(props);

    this.signInWithPopup = this.signInWithPopup.bind(this);
    this.signOut = this.signOut.bind(this);

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
    console.log('current user:' + this.user);
  }

  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        // this.props.setUser(user);
        this.setState({ user: user });
      });

    console.log('current user:' + this.user);
  }

  signOut() {
    this.props.firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.setUser(null);
      });
    console.log('current user:' + this.user);
  }

  render() {

    return(

      <div id="users">

        <p>Signed in as: { this.props.user === null ? "Guest" : this.props.user.displayName }</p>

        <button id="signIn" onClick={ this.signInWithPopup }> Sign In </button>
        <button id="signOut" onClick={ this.signOut }> Sign Out </button>

      </div>

    )}
  }

export default User;
