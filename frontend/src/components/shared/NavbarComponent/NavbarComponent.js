import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./NavbarComponent.css"
const NavbarComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <React.Fragment>
            <Container className="d-flex justify-content-center">
                <div id="intro_text" className="header_font">
                    ZEWAILCITY
                    Alumini
                    Association
                </div>
            </Container>
            <Container fluid id="nav_bar_container">
                <Container>
                    <div>
                        <Navbar light expand="md">
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto d-flex nav_list" navbar>
                                    <NavItem>
                                        <Link to="/">
                                            <NavLink >Home</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/ABOUTUS">
                                            <NavLink >about us</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/NEWS">
                                            <NavLink >news</NavLink>
                                        </Link>
                                    </NavItem>
                                    <div style={{ flexGrow: "1" }}>

                                    </div>
                                    <NavItem>
                                        {/* <NavLink href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}>apply for mempership</NavLink> */}
                                        <Link to="/LOGIN">
                                            <NavLink >apply for mempership</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/ADMIN">
                                            <NavLink >ADMIN</NavLink>
                                        </Link>
                                    </NavItem>
                                </Nav>
                                {/* <NavbarText>Simple Text</NavbarText> */}
                            </Collapse>
                        </Navbar>
                    </div>
                </Container>
            </Container>


        </React.Fragment>

    );
}

export default NavbarComponent;