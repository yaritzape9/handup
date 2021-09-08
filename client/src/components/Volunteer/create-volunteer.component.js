import React, { Component } from "react";
import VolunteerDataService from "../../services/volunteer.service";
import SectorDataService from "../../services/sector.service";

export default class AddVolunter extends Component {
  constructor(props) {
    super(props);
    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangeLName = this.onChangeLName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.saveVolunteer = this.saveVolunteer.bind(this);
    this.newVolunteer = this.newVolunteer.bind(this);

    const required = value => {
      if (!value) {
        return (
          <div className="alert alert-danger" role="alert">
            This field is required!
          </div>
        );
      }
    };

    this.state = {
      id: null,
      fname: "",
      lname: "",
      email: "",
      password: "",
      username: "",
    };
  }


  onChangeFName(e) {
    this.setState({
        fname: e.target.value
    });
  }

  onChangeLName(e) {
    this.setState({
        lname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  getAllSectors() {
    if (this.state.sector) return;
    SectorDataService.getAll()
      .then( (response) => { 
          this.setState({
            sector: response.data
          })
      })
      .catch((err) => {
          console.log(err);
      })
    
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false
    });

    this.form.validateAll();

  }

  saveVolunteer() {
    let sector = document.getElementById("sectors");
    let sectorId = -1;
    for (let [index, value] of this.state.sector.entries()) {
        if (value.sector_name == sector.value) {
          sectorId = value.sector_id;
        }
    }

    var data = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };

    VolunteerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          password: response.data.password,
          username: response.data.username,

        })
        VolunteerDataService.addSector(response.data.volunteer_id, sectorId)
        .then(sector => { 
          this.setState({
            submitted: true
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  newVolunteer() {
    this.setState({
      id: null,
      fname: "",
      lname: "",
      email: "",
      password: "",
      username: "",

      submitted: false
    });
  }

  redirectToHome() {
    // this.props.updateTitle("Home");
    this.props.history.push("/");
  }

  render() {
    this.getAllSectors();
    let items = []
    // <option value="volvo">Volvo</option>
    if (this.state.sector && !items.name) {
        for (let [index, value] of this.state.sector.entries()) {
          items.push(<option value={value.sector_name}>{value.sector_name}</option>)

        }
    }
    return (
      <div className="submit-form">
        <h4> Volunteer Registration</h4>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            {this.redirectToHome()}
            <button className="btn btn-success" onClick={this.newVolunteer}>
              Login
            </button>
          </div>
        ) : (
          <div className="card col-12 col-lg-4 mt-2 hv-center">
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                value={this.state.name}
                onChange={this.onChangeFName}
                name="fname"
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                value={this.state.name}
                onChange={this.onChangeLName}
                name="lname"
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
                validations={[this.required]}
              />
            </div>

            <div className="form-group">
            <label for="sector">Sector:</label>

            <select name="sectors" id="sectors"> {items}   </select>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <button onClick={this.saveVolunteer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}