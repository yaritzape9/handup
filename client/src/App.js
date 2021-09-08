import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNonprofit from "./components/Nonprofit/create-nonprofit.component";
import AddVolunteer from "./components/Volunteer/create-volunteer.component";
import LoginNonprofit from "./components/Nonprofit/login-nonprofit.component";
import LoginVolunteer from "./components/Volunteer/login-volunteer.component";
import VolunteerProfile from "./components/Volunteer/profile.component";
import NonprofitProfile from "./components/Nonprofit/profile.component";
import HomePage from "./components/homepage.component";
import ViewNonprofitProfile from "./components/Nonprofit/publicProfile.component";
import ViewVolunteerProfile from "./components/Volunteer/publicProfile.component";
import AddResource from "./components/Nonprofit/addResource.component";
import Resource from "./components/Nonprofit/resource.component";
import SearchNonprofits from './components/searchbar.component';
// import Tutorial from "./components/tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";

function App () {
  const [currentUser, updateCurrentUser] = useState(null) 
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);


  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('login_access_token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const logOut = (user) => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
  }

  const isNonprofitUser = () => {
    return localStorage.getItem("userType") == "nonprofit" ? true : false
  }

  const isVolunteerUser = () => {
    return localStorage.getItem("userType") == "volunteer" ? true : false
  }

    return (
      <div>
        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            {getToken() ? (
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
              {isNonprofitUser() ? (
                <Link to={"/nonprofit-profile"} className="nav-link">
                  {localStorage.getItem('user')}
                </Link>
              ) : (
                <Link to={"/volunteer-profile"} className="nav-link">
                  {localStorage.getItem('user')}
                </Link>
                )}
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
            ) : (
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login-nonprofit"} className="nav-link">
                  Nonprofit Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/login-volunteer"} className="nav-link">
                  Volunteer Login
                </Link>
              </li>

            </div>
            )}
          </div>
        </nav> */}



          <Switch>
            {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/add-nonprofit" component={AddNonprofit} />
            <Route exact path="/add-volunteer" component={AddVolunteer} />

            <Route exact path="/nonprofits/:id/add-resource">
              <AddResource showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>

            <Route exact path="/nonprofits/:id/resources/:id" component={Resource} />
            <Route exact path="/login-nonprofit" >
              <LoginNonprofit showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route exact path="/login-volunteer" >
              <LoginVolunteer showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route exact path="/volunteer-profile" >
              <VolunteerProfile />
            </Route>
            <Route exact path="/nonprofit-profile" >
              <NonprofitProfile />
            </Route>

            <Route exact path="/search-nonprofits" >
              <SearchNonprofits />
            </Route>
            

            <Route exact path="/nonprofits/:id/profile" render={(props) => <ViewNonprofitProfile {...props} /> }  />
            <Route exact path="/volunteers/:id/profile" component={ViewVolunteerProfile} />
            
            {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
          </Switch>
          
      </div>

    );
}

export default App;
