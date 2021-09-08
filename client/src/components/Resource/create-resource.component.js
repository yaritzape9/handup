import React, { Component } from "react";
import ResourceDataService from "../../services/resource.service";

export default class AddResource extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveResource = this.saveResource.bind(this);
    this.newResource = this.newResource.bind(this);

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

  saveResource() {
    var data = {
      resource_name: this.state.resource_name,
    };

    ResourceDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          resource_name: response.data.resource_name,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newResource() {
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
            <button className="btn btn-success" onClick={this.newResource}>
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


            <button onClick={this.saveResource} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}