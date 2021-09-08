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
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function NavbarMenu() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const logOut = (user) => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    localStorage.removeItem("data")
  }

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString
  };

  const isNonprofitUser = () => {
    return localStorage.getItem("userType") == "nonprofit" ? true : false
  }

  const isVolunteerUser = () => {
    return localStorage.getItem("userType") == "volunteer" ? true : false
  }
  
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>HU• </span>
            Handup
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  HU•HandUp
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>

          {isVolunteerUser() ? (
              <>
              </>
          ) : (
            <UncontrolledDropdown nav>
            <DropdownToggle
              caret
              color="default"
              data-toggle="dropdown"
              href="#pablo"
              nav
              onClick={(e) => e.preventDefault()}
            >
              <i className="fa fa-cogs d-lg-none d-xl-none" />
              Nonprofits
            </DropdownToggle>
        
            <DropdownMenu className="dropdown-with-icons">
              {getToken() ? (
                <>
                  <DropdownItem tag={Link} to="/nonprofit-profile">
                    <i className="tim-icons icon-single-02" />
                      Profile Page
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/">
                    <i className="tim-icons icon-single-02" />
                    <a onClick={logOut}> Sign Out </a>
                  </DropdownItem>
                </>
            ) : (
                <>
                  <DropdownItem tag={Link} to="/login-nonprofit">
                    <i className="tim-icons icon-bullet-list-67" />
                    Login
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/add-nonprofit">
                    <i className="tim-icons icon-bullet-list-67" />
                      Register Page
                  </DropdownItem>
                </>
            )}
          </DropdownMenu>
          </UncontrolledDropdown>
        )}

          {isNonprofitUser() ? (
                <>
                </>
          ) : (
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Volunteers
              </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  {getToken() ? (
                    <>
                      <DropdownItem tag={Link} to="/volunteer-profile">
                        <i className="tim-icons icon-single-02" />
                          Profile Page
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/">
                      <i className="tim-icons icon-single-02" />
                      <a onClick={logOut}> Sign Out </a>
                      </DropdownItem>
                    </>
                ) : (
                    <>
                      <DropdownItem tag={Link} to="/login-volunteer">
                        <i className="tim-icons icon-bullet-list-02" />
                        Login
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/add-volunteer">
                        <i className="tim-icons icon-bullet-list-67" />
                          Register Page
                      </DropdownItem>
                    </>
                )}
              </DropdownMenu>  
            </UncontrolledDropdown>
          )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;