
import React from 'react'
import { Container, Col, Row } from 'reactstrap';
import zewail_image from './assets/zewail_image3.png'
import grads from './assets/grads3.png'
import MapComponent from "./MapComponent/MapComponent"
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent"
import "./homeComponent.css"
import { Card, CardHeader, CardBody, CardTitle, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function HomeComponent(props) {



    const render_news_cards = (news_posts) => {


        let cards_view = news_posts.map((post, index) => {
            const blocks = post.EditorData.blocks;
            let thumbnailimage = process.env.REACT_APP_BACKEND_URL + '/logo.png'
            for (const index in blocks) {

                if (blocks[index].type === 'imageTool') {
                    thumbnailimage = blocks[index].data.file.url
                    break
                }
                else if (blocks[index].type === 'image') {
                    thumbnailimage = blocks[index].data.url
                    break

                }
            }
            const Title = post.meta_values[0].Title;
            const Date = post.meta_values[0].Date;
            const thumbnail_text = post.meta_values[0].thumbnail_text;


            return (
                <Col key={post._id} xs="9" md="4" className="mt-5" >
                    <NewsCardComponent img={thumbnailimage}
                        title={Title}
                        body_text={thumbnail_text}
                        Date={Date}
                        post_id={post._id}
                    />
                </Col>
            )
        })
        return (cards_view)
    }


    return (

        <React.Fragment className='p-0'>
            {/* <Network_diagramComponent logo_img={logo} />
            <div style={{ width: "100vw", overflow: "hidden" }} >
                <img className="mb-5" style={{ width: "100%", overflow: "hidden", height: "auto", position: "absolute", transform: ' scale(1)' }} src={background_wave} id="c" alt="oval" />
            </div> */}
            <Container id="aboutus_container">


                <Row id="vision_row" className="m-t-5 justify-content-center" style={{ marginTop: "30px" }}>
                    <Col xs={{ size: 10, order: 2 }} md={{ size: 6, order: 0 }} className="" style={{ display: "flex", textAlign: "left", justifyContent: "center", flexDirection: "column" }}>
                        <span className="section_title " style={{ marginTop: "-30px", marginBottom: "10px" }}>The association vision</span>
                        <div id="mission_text" className="">
                            This vision aims to utilize the energy and spirit dr Ahmed Zewail inspired to us and ensure a well-
                            connected powerful ZC community.
                        </div>
                        <a className="zcaa_link mt-lg-3 mt-4" style={{ marginTop: "10px", cursor: "pointer" }}>
                            read our full vision
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                        </a>
                    </Col>

                    <Col xs={{ size: 11, order: 0 }} md={{ size: 6, order: 2 }} className="d-flex">
                        <img className="mb-5 ml-md-auto ml-auto mr-auto mr-md-0" style={{ width: "70%", height: "auto" }} src={zewail_image} id="zewail_image" alt="oval" />

                    </Col>


                </Row>

                <Row id="mission_row" className=" justify-content-center" style={{}}>


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
                        <a className="zcaa_link mt-lg-3 mt-4" style={{ marginTop: "10px", cursor: "pointer" }}>
                            read our full mission
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                        </a>

                    </Col>


                </Row>

            </Container>

            <Container id="featured_news_container" className="" style={{ marginTop: "10px" }}>

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
                    {
                        props.news_state.NewsFetchedSuccessfully &&
                        render_news_cards(props.news_state.News)
                    }
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

