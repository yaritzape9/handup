import React, { Component } from "react";
import SectorDataService from "../../services/sector.service";

export default class AddSector extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.saveSector = this.saveSector.bind(this);
    this.newSector = this.newSector.bind(this);

    this.state = {
      id: null,
      resource_name: "",
    };
  }

  onChangeName(e) {
    this.setState({
        resource_name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeMoney(e) {
    this.setState({
      money: e.target.value
    });
  }

  saveSector() {
    var data = {
      resource_name: this.state.resource_name,
    };

    SectorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          resource_name: response.data.resource_name,
          email: response.data.email,
          money: response.data.money,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSector() {
    this.setState({
      id: null,
      resource_name: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSector}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="resource_name">Name</label>
              <input
                type="text"
                className="form-control"
                id="resource_name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="resource_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="money">Money</label>
              <input
                type="text"
                className="form-control"
                id="money"
                required
                value={this.state.money}
                onChange={this.onChangeMoney}
                name="money"
              />
            </div>

            <button onClick={this.saveSector} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}