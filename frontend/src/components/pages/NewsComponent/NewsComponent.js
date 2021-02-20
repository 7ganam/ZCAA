

import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import NewsCardComponenet from "./NewsCardComponenet/NewsCardComponenet"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./NewsComponent.css"

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);
        // console.log('news_state', this.props.news_state.News[0])
        this.render_news = this.render_news.bind(this);

    }

    render_news() {
        let posts = this.props.news_state.News.map
            ((post, index) => <Link to={`/NEWS/${post._id}`}><NewsCardComponenet post={post} /></Link>)

        return (posts)
    }



    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col id="categories_col" md={3}>

                        </Col>
                        <Col id="news_cards_row" md={9}>
                            {
                                Object.keys(this.props.news_state.News).length == 0 ?

                                    <div id="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }} >
                                        <div style={{ marginTop: "100px" }}>
                                            <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
                                        </div>
                                    </div>
                                    :
                                    // <div>{JSON.stringify(this.props.news_state.News[7], null, 2)}</div>
                                    this.render_news()

                            }
                            {/* <NewsCardComponenet /> */}
                        </Col>
                    </Row>
                </Container>
            </Fragment>

        )
    }
}
