/*

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
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import NonprofitDataService from "../../services/nonprofit.service";
import AddResource from "./addResource.component";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";

// core components
import Navbar from "../NavbarMenu";
import Footer from "../footer.component";

const carouselItems = [
  {
    src: require("../../assets/images/denys.jpg").default,
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("../../assets/images/fabien-bazanegue.jpg").default,
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("../../assets/images/mark-finn.jpg").default,
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];

let ps = null;

function PublicProfile(props) {
    let [nonprofit, setNonprofit] = useState({});
    const [data, setData] = useState([]);
    let nonprofit_id = props.location.pathname.split("/")[2];
    let value = false;

    useEffect(() => {
        NonprofitDataService.get(nonprofit_id)
        .then( (response) => { 
            setNonprofit(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [value]);

    useEffect(() => {
      NonprofitDataService.getAllResource(nonprofit_id)
      .then( (data)  => {
        setData(data.data);
      })
      .catch(err => {
        console.log(err, "ERROR")
      })
  
    }, []);

    const items = []
    for (const [index, value] of data.entries()) {
      console.log(value)
      items.push( <a href={`/nonprofits/${nonprofit_id}/resources/${value.resource_id}`}><li key={index}>{value.resource_name}</li> </a>)
    }

  const [tabs, setTabs] = React.useState(1);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  },[]);
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("../../assets/images/dots.png").default}
          />
          <img
            alt="..."
            className="path"
            src={require("../../assets/images/path4.png").default}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">{nonprofit.nonprofit_name}</h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">
                    {nonprofit.description}
                </p>
                <div className="btn-wrapper profile pt-3">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href="https://twitter.com/creativetim"
                    id="tooltip639225725"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip639225725">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="facebook"
                    href="https://www.facebook.com/creativetim"
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href="https://dribbble.com/creativetim"
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
                    Follow us
                  </UncontrolledTooltip>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("../../assets/images/devmission.png").default}
                    />
                    <h4 className="title">Transactions</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Wallet
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Send
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          News
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 4,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(4);
                          }}
                          href="#pablo"
                        >
                          Money Goal
                        </NavLink>
                      </NavItem>                   
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab4">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Money Goal</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{nonprofit.money_need}</td>
                            </tr>
                            {/* <tr>
                              <td>XRP</td>
                              <td>19.242</td>
                              <td>18,354.96 USD</td>
                            </tr> */}
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Donar</th>
                              <th className="header">AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Test User</td>
                              <td>100.00</td>
                            </tr>
                            <tr>
                              <td>Test User 2</td>
                              <td>50.00</td>
                            </tr>
                            {/* <tr>
                              <td>XRP</td>
                              <td>19.242</td>
                              <td>18,354.96 USD</td>
                            </tr> */}
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="devmission"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Latest News</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><a href="https://devmission.org/stupski-foundation-cta-grant-press-release/">Stupski Foundation CTA Grant Press Release </a></td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <ul>
                        {items}
                  </ul>
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">Resources</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                    A List of resources that we need
                    <br />
                </p>
                {/* <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Bookmark
                  </Button>
                  <Button
                    className="btn-simple"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-bulb-63" /> Check it!
                  </Button>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Contact</h1>
                    <h5 className="text-on-back">03</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Your Name</label>
                            <Input defaultValue="Full Name" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input placeholder="yourmail@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Phone</label>
                            <Input defaultValue="001-12321345" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Company</label>
                            <Input defaultValue="Company Name" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input placeholder="Message here" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Send text
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Find us at the office</h4>
                    <p>
                      360 Valencia St <br />
                      San Francisco, CA <br />
                      94013
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Give us a ring</h4>
                    <p>
                      Name of Director <br />
                      Phone number <br />
                      Mon - Fri, 8:00-16:00
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}


export default PublicProfile;




















// import React, { useState, useEffect, Component } from "react";
// import { useLocation } from "react-router-dom";
// import NonprofitDataService from "../../services/nonprofit.service";

// const PublicProfile = (props) => { 
//     let [nonprofit, setNonprofit] = useState({});
//     const [data, setData] = useState([]);
//     let nonprofit_id = props.location.pathname.split("/")[2];
//     let value = false;

//     useEffect(() => {
//         NonprofitDataService.get(nonprofit_id)
//         .then( (response) => { 
//             setNonprofit(response.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     }, [value]);


//     useEffect(() => {
//       NonprofitDataService.getAllResource(nonprofit_id)
//       .then( (data)  => {
//         setData(data.data);
//       })
//       .catch(err => {
//         console.log(err, "ERROR")
//       })
  
//     }, []);

//     const items = []
//     for (const [index, value] of data.entries()) {
//       console.log(value)
//       items.push( <a href={`/nonprofits/${nonprofit_id}/resources/${value.resource_id}`}><li key={index}>{value.resource_name}</li> </a>)
//     }
    
//     return (
//         <>
//         <div>
//           <div>
//             <strong>Id:</strong> {nonprofit.nonprofit_id}{" "}
//           </div>
//           <div>
//             <strong>Name:</strong> {nonprofit.nonprofit_name}{" "}
//           </div>
//           <div>
//             <strong>Resources Need:</strong> {items}{" "}
//           </div>
//           {/* <div>
//             <a href="#"> <strong> Volunteer SignUp </strong> </a>
//           </div> */}
//           <div>
//             <strong>Money Need:</strong> {nonprofit.money_need}{" "}
//           </div>
//         </div>
//               <a href="/">
//               <button>Back</button>
//                 </a>
//         </>
//     )
// }
// export default PublicProfile;