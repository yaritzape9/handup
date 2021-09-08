/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component, useState, useEffect} from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Navbar from "../NavbarMenu";
import Footer from "../footer.component";
import NonprofitDataService from "../../services/nonprofit.service";
import SectorDataService from "../../services/sector.service";

export default class AddNonprofit extends Component {
 
    constructor(props) {
  
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.saveNonprofit = this.saveNonprofit.bind(this);
    this.newNonprofit = this.newNonprofit.bind(this);
    this.getAllSectors = this.getAllSectors.bind(this);
  
 
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
      nonprofit_name: "",
      email: "",
      description: "",
      password: "",
      money: 0,
      sector: null,
      
    };

    this.sector = {data: ""};
  }

  onChangeName(e) {
    this.setState({
        nonprofit_name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeMoney(e) {
    this.setState({
      money: e.target.value
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
 
  saveNonprofit() {
    let sector = document.getElementById("sectors");
    let sectorId = -1;
    for (let [index, value] of this.state.sector.entries()) {
        if (value.sector_name == sector.value) {
          sectorId = value.sector_id;
        }
    }
    
    var data = {
      nonprofit_name: this.state.nonprofit_name,
      email: this.state.email,
      description: this.state.description,
      password: this.state.password,
      money: this.state.money
    };

    NonprofitDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nonprofit_name: response.data.nonprofit_name,
          email: response.data.email,
          description: response.data.description,
          password: response.data.password,
          money: response.data.money,
        })
        NonprofitDataService.addSector(response.data.nonprofit_id, sectorId)
        .then(sector => { 
          this.setState({
            submitted: true
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
      NonprofitDataService.addSector(this.state.id, sectorId)
      .then(sector => { 
        this.redirectToHome();
        this.setState({
          submitted: true
        })
        console.log("ADDED SECTOR TO NONPROFIT")
      })

    // }
  }

  newNonprofit() {
    this.setState({
      id: null,
      nonprofit_name: "",
      email: "",
      description: "",
      password: "",
      money: 0,

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
    <>
      <Navbar />
      <div className="wrapper">
          { this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
                {this.redirectToHome()}
              <button className="btn btn-success" onClick={this.newNonprofit}>
                Add
              </button>
            </div>
          ) : (
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    // style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    // style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("../../assets/images/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": false,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Full Name"
                            type="text"
                            onFocus={(e) => true}
                            onBlur={(e) => false}
                            value={this.state.nonprofit_name}
                            onChange={this.onChangeName}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": false,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onFocus={(e) => true}
                            onBlur={(e) => false}
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            // "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={(e) => true}
                            onBlur={(e) => false}
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            // "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Description"
                            type="textarea"
                            onFocus={(e) => true}
                            onBlur={(e) => false}
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                          />
                        </InputGroup>

                      <div className="form-group">
                        <label for="sector">Sector:</label>

                        <select name="sectors" id="sectors"> {items}   </select>
                      </div>
                        {/* <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup> */}
                      </Form>
                    </CardBody>
                    <CardFooter>
                    <button onClick={this.saveNonprofit} className="btn btn-success">
                      Submit
                    </button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                // style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                // style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                // style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                // style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                // style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                // style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
          
        </div>
      )}
        <Footer />
        
      </div>
  </>
    )
  }
}

// export default AddNonprofit;


















// import React, { useState, useEffect, Component } from "react";
// import NonprofitDataService from "../../services/nonprofit.service";
// import SectorDataService from "../../services/sector.service";

// export default class AddNonprofit extends Component {
//   constructor(props) {
  
//     super(props);
//     this.onChangeName = this.onChangeName.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onChangeMoney = this.onChangeMoney.bind(this);
//     this.saveNonprofit = this.saveNonprofit.bind(this);
//     this.newNonprofit = this.newNonprofit.bind(this);
//     this.getAllSectors = this.getAllSectors.bind(this);
 
//     const required = value => {
//       if (!value) {
//         return (
//           <div className="alert alert-danger" role="alert">
//             This field is required!
//           </div>
//         );
//       }
//     };

//     this.state = {
//       id: null,
//       nonprofit_name: "",
//       email: "",
//       description: "",
//       password: "",
//       money: 0,
//       sector: null,
      
//     };

//     this.sector = {data: ""};
//   }

//   onChangeName(e) {
//     this.setState({
//         nonprofit_name: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   onChangeMoney(e) {
//     this.setState({
//       money: e.target.value
//     });
//   }

//   getAllSectors() {
//     if (this.state.sector) return;
//     SectorDataService.getAll()
//       .then( (response) => { 
//           this.setState({
//             sector: response.data
//           })
//       })
//       .catch((err) => {
//           console.log(err);
//       })
    
//   }
 
//   saveNonprofit() {
//     let sector = document.getElementById("sectors");
//     let sectorId = -1;
//     for (let [index, value] of this.state.sector.entries()) {
//         if (value.sector_name == sector.value) {
//           sectorId = value.sector_id;
//         }
//     }
    
//     var data = {
//       nonprofit_name: this.state.nonprofit_name,
//       email: this.state.email,
//       description: this.state.description,
//       password: this.state.password,
//       money: this.state.money
//     };

//     NonprofitDataService.create(data)
//       .then(response => {
//         this.setState({
//           id: response.data.id,
//           nonprofit_name: response.data.nonprofit_name,
//           email: response.data.email,
//           description: response.data.description,
//           password: response.data.password,
//           money: response.data.money,
//         })
//         NonprofitDataService.addSector(response.data.nonprofit_id, sectorId)
//         .then(sector => { 
//           this.setState({
//             submitted: true
//           })
//         })
//       })
//       .catch(e => {
//         console.log(e);
//       });
//       NonprofitDataService.addSector(this.state.id, sectorId)
//       .then(sector => { 
//         this.setState({
//           submitted: true
//         })
//         console.log("ADDED SECTOR TO NONPROFIT")
//       })

//     // }
//   }

//   newNonprofit() {
//     this.setState({
//       id: null,
//       nonprofit_name: "",
//       email: "",
//       description: "",
//       password: "",
//       money: 0,

//       submitted: false
//     });
//   }
  
//   render() {
//     this.getAllSectors();
//     let items = []
//     // <option value="volvo">Volvo</option>
//     if (this.state.sector && !items.name) {
//         for (let [index, value] of this.state.sector.entries()) {
//           items.push(<option value={value.sector_name}>{value.sector_name}</option>)

//         }
//     }
//     return (
//       <div className="submit-form">
//         <h4> Nonprofit Registration</h4>
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className="btn btn-success" onClick={this.newNonprofit}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group">
//               <label htmlFor="nonprofit_name">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="nonprofit_name"
//                 required
//                 value={this.state.name}
//                 onChange={this.onChangeName}
//                 name="nonprofit_name"
//               />
//             </div>

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
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 required
//                 value={this.state.description}
//                 onChange={this.onChangeDescription}
//                 name="description"
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

//             <div className="form-group">
//               <label htmlFor="money">Money</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="money"
//                 required
//                 value={this.state.money}
//                 onChange={this.onChangeMoney}
//                 name="money"
//               />
//             </div>
//             <div className="form-group">
//             <label for="sector">Sector:</label>

//             <select name="sectors" id="sectors"> {items}   </select>
//             </div>

//             <button onClick={this.saveNonprofit} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }