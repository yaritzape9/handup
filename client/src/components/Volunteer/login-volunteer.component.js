import React, { useState } from "react";
import { withRouter } from "react-router";

// import AuthService from "../services/auth.service";
import VolunteerDataService from "../../services/volunteer.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
 
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

   const onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  const onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const payload = {
        "email": state.email,
        "password": state.password
    }
    console.log(payload)

     VolunteerDataService.signin(payload)
    .then((response) => {
        if (response.status == 200) {
            setState(prevState => ({
                ...prevState,
                'successMessage': "Login Successful. Redirecting to home page"
            }))
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user.username);
            localStorage.setItem("userType", "volunteer");
            redirectToHome()
            props.showError(null)
        }
        else if(response.code === 204){
            props.showError("Username and password do not match");
        }
        else{
            props.showError("Username does not exists");
        }
    })
    .catch( (error) => {
        console.log(error);
    });

  } 

    const redirectToHome = () => {
        props.updateTitle("Home");
        props.history.push("/");
    }

    const redirectToRegister = () => { 
        props.history.push("/add-volunteer");
        props.updateTitle("Register");
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h4> Volunteer Login </h4>
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}


export default withRouter(Login);







