import React, {Component, useState} from 'react';
import { withRouter } from "react-router";
import NonprofitService from '../../services/nonprofit.service';

class AddResource extends Component {
    constructor(props) {
      super(props);
      this.id = localStorage.getItem("id")
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
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
        resource_name: "",
        description: "",
      };

    }
  
    onChangeName(e) {
      this.setState({
          resource_name: e.target.value
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    handleSubmitClick = (e) => {
        e.preventDefault();
    
        const payload = {
            "resource_name": this.state.resource_name,
            "description": this.state.description
        }
        NonprofitService.createResource(this.id, payload)
        .then((response) => {
            if (response.status == 200) {
                this.setState(prevState => ({
                    ...prevState,
                    'successMessage': "Added Resource. Redirecting to home page"
                }))
                this.redirectToHome()
                this.props.showError(null)
            }
            else if(response.code === 204 || response.code === 400){
                this.props.showError("Unable to add Resource");
            }
            else{
                this.props.showError("Nonprofit does not exists");
            }
        })
        .catch( (error) => {
            console.log(error);
        });
    
      }
      

     redirectToHome = () => {
        this.props.updateTitle("Profile");

        this.props.history.push(`/nonprofit-profile`);
    }
    render() {
      return (
        <div className="submit-form">
          <h4> Add a Resource </h4>

            <div>
              <div className="form-group">
                <label htmlFor="resource_name">Resource Name</label>
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
                <label htmlFor="email">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="email"
                />
              </div>
  
  
              <button onClick={this.handleSubmitClick} className="btn btn-success">
                Submit
              </button>
            </div>

        </div>
      );
    }
  }

  export default withRouter(AddResource);