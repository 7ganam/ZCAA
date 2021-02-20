
import React, { useState, useCallback, useEffect } from 'react'
import HomeComponent from './components/pages/homeComponent/homeComponent'
import AboutComponent from './components/pages/AboutComponent/AboutComponent'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarComponent from './components/shared/NavbarComponent/NavbarComponent'
import FooterComponent from './components/shared/FooterComponent/FooterComponent'
import LoginComponent from './components/pages/LoginComponent/LoginComponent'
import NewsComponent from './components/pages/NewsComponent/NewsComponent'
import ScrollToTopComponent from "./ScrollToTopComponent"
import AdminComponent from "./components/pages/AdminComponent/AdminComponent"
import ReactLoading from 'react-loading';
import NewsPostViewComponent from "./components/pages/NewsComponent/NewsPostViewComponent/NewsPostViewComponent"
export default function MainComponent() {

    const [LoggedIn, setLoggedIn] = useState(false);
    // const [IsFetchingNews, setIsFetchingNews] = useState(true) // causes error ...states get set in different times ...better to depend on the fact that the data exists to show loading component than using this variable
    const [NewsFetchedSuccessfully, setNewsFetchedSuccessfullys] = useState(false)
    const [FetchingNewsError, setFetchingNewsError] = useState(null)
    const [News, setNews] = useState([])



    const loggedin_context = React.createContext({ loggedIn: false, login_function: () => { } });

    const login_function = () => {
        setLoggedIn(true)
    }

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
                setNewsFetchedSuccessfullys(true);
                setNews(responseJson)
                console.log({ responseJson })
            })
            .catch((error) => {
                console.log(error)
                setNewsFetchedSuccessfullys(false);
                setFetchingNewsError(error)
            });
    }



    useEffect(() => {
        fetchCourses()
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
            console.log({ filtered_News })
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



                        <Route exact path="/ADMIN">
                            <AdminComponent />
                        </Route>

                    </Router>
                </loggedin_context.Provider>
            </div>
            <FooterComponent />

        </div >

    )
}

