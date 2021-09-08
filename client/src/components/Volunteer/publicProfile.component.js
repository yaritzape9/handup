import React, { Component } from "react";
// import NonprofitDataService from "../../services/nonprofit.service";

// import AuthService from "../services/auth.service";

export default class PublicProfile extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    // const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Profile
          </h3>
        </header>

        <p>
          <strong>Id:</strong>{" "}
          {/* {currentUser.id} */}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {/* {currentUser.email} */}
        </p>
        {/* <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>
    );
  }
}
