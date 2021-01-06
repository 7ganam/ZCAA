
import React from 'react'
import HomeComponent from './components/pages/homeComponent/homeComponent'
import AboutComponent from './components/pages/AboutComponent/AboutComponent'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarComponent from './components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from './components/shared/FooterComponent/FooterComponent'
import LoginComponent from './components/pages/LoginComponent/LoginComponent'

export default function MainComponent() {
    return (
        <div id="main_component">
            <div id="content_wrap">

                <Router >
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
            </div>
            <FooterComponent />

        </div>

    )
}

