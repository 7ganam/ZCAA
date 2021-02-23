
import { LoginContextProvider, LoginContext } from "./contexts/loginContext"
import { useContext } from "react";


import React, { useState, useEffect } from 'react'
import HomeComponent from './components/pages/homeComponent/homeComponent'
import AboutComponent from './components/pages/AboutComponent/AboutComponent'

import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarComponent from './components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from './components/shared/FooterComponent/FooterComponent'
import LoginComponent from './components/pages/LoginComponent/LoginComponent'
import NewsComponent from './components/pages/NewsComponent/NewsComponent'
import ScrollToTopComponent from "./ScrollToTopComponent"
import AdminComponent from "./components/pages/AdminComponent/AdminComponent"
import NewsPostViewComponent from "./components/pages/NewsComponent/NewsPostViewComponent/NewsPostViewComponent"
import LoginModalComponenet from "./components/shared/LoginModalComponenet/LoginModalComponenet"

import Network_diagramComponent from "./components/shared/Network_diagramComponent/Network_diagramComponent"
import background_wave from './hero4.png'
import logo from './assets/logo.png'


export default function MainComponent() {
    const { login, logout } = useContext(LoginContext);


    // const [IsFetchingNews, setIsFetchingNews] = useState(true) // causes error ...states get set in different times ...better to depend on the fact that the data exists to show loading component than using this variable
    const [NewsFetchedSuccessfully, setNewsFetchedSuccessfullys] = useState(false)
    const [FetchingNewsError, setFetchingNewsError] = useState(null)
    const [News, setNews] = useState([])





    const fetchCourses = () => {
        console.log(process.env.REACT_APP_BACKEND_URL)
        return fetch(process.env.REACT_APP_BACKEND_URL + '/api/news/news_posts')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                setNews(responseJson) // set this first before you set the successs flag
                setNewsFetchedSuccessfullys(true);
            })
            .catch((error) => {
                console.log(error)
                setFetchingNewsError(error || "something went wrong")
                setNewsFetchedSuccessfullys(false);
            });
    }

    const check_if_logged_in = () => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token) {
            login(storedData.token, storedData.user, storedData.expirateion_date_string, false);
        }
    }


    useEffect(() => {
        fetchCourses()
        check_if_logged_in()
    }, []);


    const News_post_with_id = (props) => {
        if (!props.news_state.News) {
            return (
                <div id="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }} >
                    loading...
                </div>
            )

        }
        else {
            let filtered_News = props.news_state.News.filter((post) => post._id === props.match.params.post_id)
            return (
                <NewsPostViewComponent
                    news_state={{ NewsFetchedSuccessfully, FetchingNewsError, News: filtered_News }}
                />
            )
        }

    };



    return (
        <div id="main_component">
            <div id="content_wrap">
                <LoginModalComponenet />

                <Router >
                    <ScrollToTopComponent />
                    <NavbarComponent />
                    {/* the navbar has to be inside the router since it uses LINK component which runs only inside router component */}
                    <Network_diagramComponent logo_img={logo} />
                    <div style={{ width: "100vw", overflow: "hidden" }} >
                        <img className="mb-5" style={{ width: "100%", overflow: "hidden", height: "auto", position: "absolute", transform: ' scale(1)', zIndex: "-100" }} src={background_wave} id="c" alt="oval" />
                    </div>
                    <Route exact path="/">
                        <HomeComponent news_state={{ NewsFetchedSuccessfully, FetchingNewsError, News: News.slice(0, 3) }} />
                    </Route>
                    <Route exact path="/ABOUTUS">
                        <AboutComponent />
                    </Route>
                    <Route exact path="/LOGIN">
                        <LoginComponent />
                    </Route>
                    <Route exact path="/NEWS">
                        <NewsComponent
                            news_state={{ NewsFetchedSuccessfully, FetchingNewsError, News }}
                        />
                    </Route>
                    <Route path="/NEWS/:post_id"
                        component={(props) => <News_post_with_id
                            {...props} // you have to re pass the router props before passing your own
                            news_state={{ NewsFetchedSuccessfully, FetchingNewsError, News }}
                        />}
                    />

                    <Route exact path="/ADMIN/CREATEPOST">
                        <AdminComponent />
                    </Route>

                </Router>



            </div>
            <FooterComponent />

        </div >

    )
}

