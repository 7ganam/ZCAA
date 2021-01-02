
import React from 'react'
import HomeComponent from './components/pages/homeComponent/homeComponent'
import AboutComponent from './components/pages/AboutComponent/AboutComponent'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarComponent from './components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from './components/shared/FooterComponent/FooterComponent'

export default function MainComponent() {
    return (
        <div id="main_component">
            <NavbarComponent />
            <div id="content_wrap">
                <Router >
                    <Route exact path="/">
                        <HomeComponent />
                    </Route>
                    <Route exact path="/ABOUTUS">
                        <AboutComponent />
                    </Route>
                </Router>
            </div>
            <FooterComponent />

        </div>

    )
}

