import news_image_1 from "./assets/WhatsApp-Image-2019-09-09-at-11.54.56-AM.jpeg"
import news_image_2 from "./assets/nationalfinals-egypt-1.jpg"
import news_image_3 from "./assets/unnamed.jpg"



import React from 'react'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import Network_diagramComponent from "./Network_diagramComponent/Network_diagramComponent"
import zewail_image from './assets/zewail_image3.png'
import helmy_image from './assets/helmy_image1.jpg'
import grads from './assets/grads3.png'

import logo from './assets/logo.png'
import logo2 from './assets/logo2.png'
import background_wave from './assets/hero4.png'



import welcome_illustration from './assets/welcome_illustration.png'
import { VectorMap } from "react-jvectormap"
import MapComponent from "./MapComponent/MapComponent"
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent"
import "./homeComponent.css"
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function HomeComponent() {


    return (
        <React.Fragment className='p-0'>
            <Network_diagramComponent logo_img={logo} />
            <div style={{ width: "100vw", overflow: "hidden" }} >
                <img className="mb-5" style={{ width: "100%", overflow: "hidden", height: "auto", position: "absolute", transform: ' scale(1)' }} src={background_wave} id="c" alt="oval" />
            </div>
            <Container id="aboutus_container" style={{ marginTop: "100px" }}>

                <Row id="mission_row" className="m-t-5 justify-content-center" style={{ marginTop: "30px" }}>
                    <Col xs={{ size: 10, order: 2 }} md={{ size: 6, order: 0 }} className="" style={{ display: "flex", textAlign: "left", justifyContent: "center", flexDirection: "column" }}>
                        <span className="section_title" style={{ marginTop: "-30px", marginBottom: "10px" }}>The association vision</span>
                        <div id="mission_text">
                            This vision aims to utilize the energy and spirit dr Ahmed Zewail inspired to us and ensure a well-
                            connected powerful ZC community.
                        </div>
                        <a className="zcaa_link mt-lg-3" style={{ marginTop: "10px" }}>
                            read our full vision
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                        </a>
                    </Col>

                    <Col xs={{ size: 11, order: 0 }} md={{ size: 6, order: 2 }} className="d-flex justify-content-center">
                        <img className="mb-5" style={{ width: "70%", height: "auto" }} src={zewail_image} id="c" alt="oval" />
                    </Col>


                </Row>

                <Row id="vision_row" className="m-t-5 justify-content-center" style={{ marginTop: "30px" }}>

                    <Col xs="11" md="6" className="">
                        <img className="mb-5" style={{ width: "100%", height: "auto" }} src={grads} id="c" alt="oval" />
                    </Col>
                    <Col xs="10" md="6" className="" style={{ display: "flex", textAlign: "left", justifyContent: "center", flexDirection: "column" }}>
                        <span className="section_title" style={{ marginTop: "-30px", marginBottom: "10px" }}>The association Mission</span>
                        <div id="mission_text">
                            Our mission is supporting Zewail City in its pursuit of excellence and building a place for
                            the Alumni to keep ties with their alma mater by supporting their needs, elevating their
                            connections, and assisting their career’s development.
                        </div>
                        <a className="zcaa_link mt-lg-3" style={{ marginTop: "10px" }}>
                            read our full mission
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                        </a>

                    </Col>


                </Row>

            </Container>
            <Container id="featured_news_container" className="" style={{ marginTop: "70px" }}>
                <Row>
                    <Col xs="12" className="" >
                        <div
                            style={{
                                textAlign: "left",
                                marginTop: "50px",
                                borderTopStyle: 'solid',
                                borderTopWidth: "0.5px",
                                borderTopColor: " #C5BCBC"
                            }} className="section_title"
                        >
                            featured news
                        </div>
                    </Col>

                </Row>
                <Row className="justify-content-center">
                    <Col xs="9" md="4" className="mt-5" >
                        <NewsCardComponent img={news_image_3}
                            title="Zewail City Students Win Biotechnology Competition"
                            body_text="For the second time in a row, University of Science and Technology students achieved the first place in the Science Operations Leaders in Egypt (SOLE) competition which took place September 12, 2015 at the Faculty of Agriculture, Ain Shams University."
                        />
                    </Col>
                    <Col xs="9" md="4" className="mt-5" >
                        <NewsCardComponent img={news_image_2} title="Zewail City Wins Shell’s National Imagine the Future Competition"
                            body_text="Students of Zewail City of Science and Technology (ZU12) won the first place in Shell’s national Imagine the Future competition 2019-2020.”"
                        />
                    </Col>
                    <Col xs="9" md="4" className="mt-5">
                        <NewsCardComponent img={news_image_1} title="New Campus Development"
                            body_text="Former Egyptian President Adly Mansour issued decree 115 on April 9, 2014, granting 198 acres to Zewail City for the construction of the new campus in the October Gardens of 6th of October City.

                        President Abdel Fattah al-Sisi decreed that the new campus be built by the Engineering Authority of the Egyptian Armed Forces and inaugurated in a one-year time frame. The University of Science and Technology in Zewail City  and Research Institutes are now fully operational at current campus in October Gardens. A team of prominent architects"
                        />
                    </Col>

                </Row>
            </Container>
            <Container id="shadow_container_1" fluid style={{ marginTop: "100px" }}>

            </Container>
            <Container id="welcome_container" fluid className="mx-0" >
                {/* <img id="welcome_illustration" src={welcome_illustration} alt="oval" /> */}
                <Container>
                    <Row>
                        <div id="welcome_title" >
                            Zewail city graduate ?
                        </div>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Card id="welcome_card" style={{}}>
                                <CardHeader id="welcome_card_header" style={{}}>Welcome onboard</CardHeader>
                                <CardBody>
                                    <CardTitle id="welcome_card_body" tag="h5">apply for your membership in the associasion</CardTitle>
                                    {/* <CardText>With supporting text below as a natural lead-in to additional content.</CardText> */}
                                    <Link to="/LOGIN" style={{ textDecoration: 'none' }}>
                                        <button className="welcome_btn welcome_btn2" style={{ width: "100%", height: "55px" }}>APPLY</button>
                                    </Link>

                                </CardBody>
                            </Card>
                        </Col>

                    </Row>


                </Container>
            </Container>
            <Container id="map_container" fluid className="">
                <div id="map_wrapper">
                    <MapComponent />
                </div>
            </Container>
        </React.Fragment>

    )
}

