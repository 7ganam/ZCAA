import React, { useState } from 'react';
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
                                        <NavLink href="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/ABOUTUS">about us</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">news</NavLink>
                                    </NavItem>
                                    <div style={{ flexGrow: "1" }}>

                                    </div>
                                    <NavItem>
                                        <NavLink href="/">apply for mempership</NavLink>
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