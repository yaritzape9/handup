// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// // import AuthService from "../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       loading: true
//     });

//     this.form.validateAll();

//     // if (this.checkBtn.context._errors.length === 0) {
//     //   AuthService.login(this.state.username, this.state.password).then(
//     //     () => {
//     //       this.props.history.push("/profile");
//     //       window.location.reload();
//     //     },
//     //     error => {
//     //       const resMessage =
//     //         (error.response &&
//     //           error.response.data &&
//     //           error.response.data.message) ||
//     //         error.message ||
//     //         error.toString();

//     //       this.setState({
//     //         loading: false,
//     //         message: resMessage
//     //       });
//     //     }
//     //   );
//     // } else {
//     //   this.setState({
//     //     loading: false
//     //   });
//     // }
//   }

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleLogin}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>

//             {this.state.message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }




// import React, { Component } from "react";
// import NonprofitDataService from "../../services/nonprofit.service";

// // import AuthService from "../../services/auth.service";

// export default class LoginNonprofit extends Component {
//   constructor(props) {
//     super(props);
//     // this.onChangeName = this.onChangeName.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     // this.onChangeMoney = this.onChangeMoney.bind(this);
//     this.loginNonprofit = this.loginNonprofit.bind(this);
//     // this.newNonprofit = this.newNonprofit.bind(this);

//     // const required = value => {
//     //   if (!value) {
//     //     return (
//     //       <div className="alert alert-danger" role="alert">
//     //         This field is required!
//     //       </div>
//     //     );
//     //   }
//     // };

//     this.state = {
//       email: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   loginNonprofit() {
//     var data = {
//       email: this.state.email,
//       password: this.state.password
//     };

//     // if (this.checkBtn.context._errors.length === 0) {
//       // AuthService.register(
//       //   this.state.username,
//       //   this.state.email,
//       //   this.state.password
//       // ).then(
//       //   response => {
//       //     this.setState({
//       //       message: response.data.message,
//       //       successful: true
//       //     });
//       //   },
//       //   error => {
//       //     const resMessage =
//       //       (error.response &&
//       //         error.response.data &&
//       //         error.response.data.message) ||
//       //       error.message ||
//       //       error.toString();

//       //     this.setState({
//       //       successful: false,
//       //       message: resMessage
//       //     });
//       //   }
//       // );

//     NonprofitDataService.signin(data)
//       .then(response => {
//         this.setState({
//           email: response.data.email,
//           password: response.data.password,

//           loading: true
//         });
        
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });

//     // }
//   }

// //   newNonprofit() {
// //     this.setState({
// //       id: null,
// //       nonprofit_name: "",
// //       email: "",
// //       password: "",
// //       money: 0,

// //       submitted: false
// //     });
// //   }

//   render() {
//     return (
//       <div className="submit-form">
//         {this.state.loading ? (
//           <div>
//             <h4>You have successfully logged in!</h4>
//             {/* <button className="btn btn-success" onClick={this.newNonprofit}>
//               Add
//             </button> */}
//           </div>
//         ) : (
//           <div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="email"
//                 required
//                 value={this.state.email}
//                 onChange={this.onChangeEmail}
//                 name="email"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 required
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 name="password"
//               />
//             </div>

//             <button onClick={this.loginNonprofit} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }











import React, { useState, Component } from "react";
import { withRouter } from "react-router";

// import AuthService from "../services/auth.service";
import NonprofitDataService from "../../services/nonprofit.service";

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

     NonprofitDataService.signin(payload)
    .then((response) => {
        if (response.status == 200) {
            setState(prevState => ({
                ...prevState,
                'successMessage': "Login Successful. Redirecting to home page"
            }))
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user.nonprofit_name);
            localStorage.setItem("userType", "nonprofit");
            console.log(response.data)
            localStorage.setItem("id", response.data.user.nonprofit_id )
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
        props.history.push("/add-nonprofit");
        props.updateTitle("Register");
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h4> Nonprofit Login </h4>
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







