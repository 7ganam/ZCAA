
import React, { useState, useCallback, useEffect } from 'react'
import HomeComponent from './components/pages/homeComponent/homeComponent'
import AboutComponent from './components/pages/AboutComponent/AboutComponent'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarComponent from './components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from './components/shared/FooterComponent/FooterComponent'
import LoginComponent from './components/pages/LoginComponent/LoginComponent'

import ScrollToTopComponent from "./ScrollToTopComponent"
export default function MainComponent() {

    const [LoggedIn, setLoggedIn] = useState(false);
    const loggedin_context = React.createContext({ loggedIn: false, login_function: () => { } });

    const login_function = () => {
        setLoggedIn(true)
    }
    return (
        <div id="main_component">
            <div id="content_wrap">
                <loggedin_context.Provider value={LoggedIn} >
                    <Router >
                        <ScrollToTopComponent />
                        <NavbarComponent />
                        {/* the navbar has to be inside the router since it uses LINK component which runs only inside router component */}

                        <Route exact path="/">
                            <HomeComponent />
                        </Route>
                        <Route exact path="/ABOUTUS">
                            <AboutComponent />
                        </Route>
                        <Route exact path="/LOGIN">
                            <LoginComponent />
                        </Route>
                    </Router>
                </loggedin_context.Provider>
            </div>
            <FooterComponent />

        </div >

    )
}

