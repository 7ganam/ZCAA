import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext"
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import "./NavbarComponent.css"
const NavbarComponent = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const { login, IsLoggedIn, Token, ToggleLoginModal, logout } = useContext(LoginContext);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <React.Fragment>
            {
                !!Token && Token.admin &&
                <Container fluid className="d-flex justify-content-left" style={{ height: "50px", backgroundColor: "#26ADCB", paddingLeft: "0px" }}>
                    <div style={{ margin: "0px 0px", color: 'white', fontWeight: "bolder", display: "flex", alignItems: "center", backgroundColor: "black", padding: "10px" }}>

                        <div >ADMIN actions : </div>

                    </div>
                    <div style={{ margin: "0px 20px", color: 'white', fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <Link to="/ADMIN/CREATEPOST">
                            <div >CREATE NEW POST</div>
                        </Link>
                    </div>
                    <div style={{ color: 'white', fontWeight: "bold", display: "flex", alignItems: "center" }}>
                        <Link to="/NEWS">
                            <div >DELETE POSTS</div>
                        </Link>
                    </div>
                </Container>
            }
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
                                    {!IsLoggedIn &&
                                        <>
                                            <NavItem style={{ borderRightStyle: "solid", borderRightWidth: ".5px", borderRightColor: "grey" }}>
                                                <Link to="/LOGIN">
                                                    <NavLink >apply for membership</NavLink>
                                                </Link>
                                            </NavItem>
                                            <NavItem onClick={ToggleLoginModal} style={{ cursor: 'pointer' }}>
                                                <NavLink >Login</NavLink>
                                            </NavItem>
                                        </>
                                    }
                                    {IsLoggedIn &&
                                        <>
                                            <NavItem onClick={logout} style={{ cursor: 'pointer', borderRightStyle: "solid", borderRightWidth: ".5px", borderRightColor: "grey" }}>
                                                <NavLink >Logout</NavLink>
                                            </NavItem>
                                            <NavItem >
                                                <NavLink >
                                                    <img style={{ width: "40px", height: "40", borderRadius: "100%", }} src={Token.g_picture} alt="logo" />
                                                </NavLink>

                                            </NavItem>


                                        </>
                                    }


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