import React, { Component } from "react";

export class Profile extends Component {
  render() {
    return (
      <div>
        <h1>This is my profile</h1>
        <form action="/" method="POST">
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="age" placeholder="age" />
          <input type="text" name="email" placeholder="email" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Profile;
